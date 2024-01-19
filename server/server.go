package main

import (
	"github.com/blue-rpc/bluerpc"
	"github.com/blue-rpc/docs/routes"
)

func main() {
	app := bluerpc.New(&bluerpc.Config{
		OutputPath: "../client/src/API.ts",
	})

	routes.GenerateHelloRoute(app)
	app.Listen(":8082")
}
