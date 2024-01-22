package main

import (
	"github.com/blue-rpc/bluerpc"
	md "github.com/blue-rpc/docs/parseMarkdown"
)

type test_local_query struct {
	Files string `paramName:"fileName" validate:"required"`
}

type test_output struct {
	PageStructure []md.MarkdownElement `paramName:"structure" validate:"required"`
}

func main() {
	// validate := validator.New(validator.WithRequiredStructEnabled())

	app := bluerpc.New(&bluerpc.Config{
		OutputPath:  "../client/src/API.ts",
		ServerURL:   "http://localhost",
		CORS_Origin: "*",
	})

	proc := bluerpc.NewQuery[test_local_query, test_output](app, func(ctx *bluerpc.Ctx, query test_local_query) (*bluerpc.Res[test_output], error) {

		parsedMarkdown, err := md.ParseDoc(query.Files)
		if err != nil {
			return nil, err
		}

		return &bluerpc.Res[test_output]{
			Status: 200,
			Header: bluerpc.Header{},
			Body: test_output{
				PageStructure: parsedMarkdown,
			},
		}, nil
	})

	proc.Attach(app, `/api/documentation/files/:fileName`)
	app.Listen(":8080")

}
