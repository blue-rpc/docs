package md

import (
	"bufio"
	"fmt"
	"os"
	"regexp"

	"github.com/google/uuid"
)

type MarkdownElement struct {
	Type    string `json:"type" paramName:"type"`
	Content any    `json:"content" paramName:"content"`
	Id      string `paramName:"id" validation:"required"`
}

type Codeblock struct {
	Language string `paramName:"language" json:"language" `
	Code     string `paramName:"code" json:"code" `
}

type ListElement struct {
	Title        string   `json:"title" paramName:"content"`
	BulletPoints []string `json:"bulletPoints" paramName:"content"`
}

func ParseDoc(filename string) ([]MarkdownElement, error) {
	file, err := os.Open(fmt.Sprintf("./docs/%s.md", filename))
	if err != nil {
		return nil, err
	}
	defer file.Close()

	var elements []MarkdownElement
	scanner := bufio.NewScanner(file)

	h1Regex := regexp.MustCompile(`^# (.*)`)
	h2Regex := regexp.MustCompile(`^## (.*)`)
	h3Regex := regexp.MustCompile(`^### (.*)`)
	h4Regex := regexp.MustCompile(`^#### (.*)`)
	listItemRegex := regexp.MustCompile(`^(\*|-|\+|[0-9]+\.)(\s+)(.*)`)
	codeStartRegex := regexp.MustCompile("^```(\\w*)") // Modified regex to capture optional language

	noteRegex := regexp.MustCompile(`<note>`)
	endNodeRegex := regexp.MustCompile(`</note>`)

	importantRegex := regexp.MustCompile(`<important>`)
	endImportantRegex := regexp.MustCompile(`</important>`)

	inNoteBlock := false
	inCodeBlock := false
	inImportantBlock := false
	inList := false

	var codeBlockContent string
	var codeLanguage string
	var noteBlockContent string
	var importantBlockContent string
	var listContent ListElement
	for scanner.Scan() {
		line := scanner.Text()

		if inCodeBlock {
			if codeStartRegex.MatchString(line) {
				id := uuid.New().String()
				elements = append(elements, MarkdownElement{
					Type:    "code",
					Content: Codeblock{Language: codeLanguage, Code: codeBlockContent},
					Id:      id,
				})
				inCodeBlock = false
				codeBlockContent = ""
				codeLanguage = ""
			} else {
				codeBlockContent += line + "\n"
			}
			continue
		}

		if inNoteBlock {
			if endNodeRegex.MatchString(line) {
				id := uuid.New().String()
				elements = append(elements, MarkdownElement{"note", noteBlockContent, id})
				inNoteBlock = false
				noteBlockContent = ""
			} else {
				noteBlockContent += line + "\n"
			}
			continue
		}

		if inImportantBlock {
			if endImportantRegex.MatchString(line) {
				id := uuid.New().String()
				elements = append(elements, MarkdownElement{"important", importantBlockContent, id})
				inImportantBlock = false
				importantBlockContent = ""
			} else {
				importantBlockContent += line + "\n"
			}
			continue
		}

		if listItemRegex.MatchString(line) {
			if !inList {
				inList = true
				listContent = ListElement{}
			}
			match := listItemRegex.FindStringSubmatch(line)
			listContent.BulletPoints = append(listContent.BulletPoints, match[3])
		} else {
			if inList {
				id := uuid.New().String()
				elements = append(elements, MarkdownElement{"list", listContent, id})
				inList = false
			}
			if h1Regex.MatchString(line) {
				id := uuid.New().String()
				match := h1Regex.FindStringSubmatch(line)
				elements = append(elements, MarkdownElement{"h1", match[1], id})
			} else if h2Regex.MatchString(line) {
				id := uuid.New().String()
				match := h2Regex.FindStringSubmatch(line)
				elements = append(elements, MarkdownElement{"h2", match[1], id})
			} else if h3Regex.MatchString(line) {
				id := uuid.New().String()
				match := h3Regex.FindStringSubmatch(line)
				elements = append(elements, MarkdownElement{"h3", match[1], id})
			} else if h4Regex.MatchString(line) {
				id := uuid.New().String()
				match := h4Regex.FindStringSubmatch(line)
				elements = append(elements, MarkdownElement{"h4", match[1], id})
			} else if codeStartRegex.MatchString(line) {
				inCodeBlock = true
				codeLanguage = codeStartRegex.FindStringSubmatch(line)[1]
			} else if noteRegex.MatchString(line) {
				inNoteBlock = true
			} else if importantRegex.MatchString(line) {
				inImportantBlock = true
			} else if len(line) > 0 {
				id := uuid.New().String()
				elements = append(elements, MarkdownElement{"p", line, id})
			}
		}
	}

	if inList {
		id := uuid.New().String()
		elements = append(elements, MarkdownElement{"list", listContent, id})
	}

	if err := scanner.Err(); err != nil {
		return nil, err
	}

	return elements, nil
}
