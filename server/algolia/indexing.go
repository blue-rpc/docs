package algolia

import (
	"fmt"
	"io/fs"
	"log"
	"os"
	"path/filepath"
	"regexp"
	"strings"

	"github.com/algolia/algoliasearch-client-go/v3/algolia/search"
	"github.com/joho/godotenv"
)

type MarkdownSection struct {
	ObjectID string `json:"objectID"`
	Slug     string `json:"slug"`
	Section  string `json:"section"`
	Content  string `json:"content"`
}

func IndexDocs() {
	godotenv.Load(".env")
	ALGOLIA_APPLICATION_ID := os.Getenv("ALGOLIA_APPLICATION_ID")
	ALGOLIA_ADMIN_API_KEY := os.Getenv("ALGOLIA_ADMIN_API_KEY")

	// Connect and authenticate with your Algolia app
	client := search.NewClient(ALGOLIA_APPLICATION_ID, ALGOLIA_ADMIN_API_KEY)
	index := client.InitIndex("bluerpc_docs")

	sectionRegex := regexp.MustCompile(`^(#{1,3})\s+(.*)`)
	var currentSection *MarkdownSection
	var currentContent strings.Builder

	err := filepath.Walk("./docs", func(path string, info fs.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if !info.IsDir() && strings.HasSuffix(info.Name(), ".md") {
			content, err := os.ReadFile(path)
			if err != nil {
				return err
			}

			slug := strings.TrimSuffix(info.Name(), ".md")
			lines := strings.Split(string(content), "\n")

			for _, line := range lines {
				if matches := sectionRegex.FindStringSubmatch(line); matches != nil {
					// Save the previous section if it exists
					if currentSection != nil {
						currentSection.Content = currentContent.String()

						fmt.Println("current section", currentSection.Section, "current section slug", currentSection.Slug)
						if _, err = index.SaveObject(currentSection); err != nil {
							return err
						}
						currentContent.Reset()
					}

					// Start a new section
					currentSection = &MarkdownSection{
						ObjectID: slug + "-" + matches[2], // Unique ID
						Slug:     slug,
						Section:  matches[2],
					}
				} else if currentSection != nil {
					currentContent.WriteString(line + "\n")
				}
			}

			// Handle the last section
			if currentSection != nil {
				currentSection.Content = currentContent.String()
				if _, err = index.SaveObject(currentSection); err != nil {
					return err
				}
			}
		}
		return nil
	})

	if err != nil {
		log.Fatalf("Error indexing documents: %v", err)
	}
}
