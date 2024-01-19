package routes

import (
	"fmt"

	"github.com/blue-rpc/bluerpc"
)

func GenerateHelloRoute(app *bluerpc.App) {
	usersRoute := app.Router("/users")
	type Query_Params struct {
		Name    string `paramName:"name"`
		Message string `paramName:"message"`
	}

	type Output struct {
		Greet string `paramName:"greet" validate:"required"`
	}
	userInfoQuery := bluerpc.NewQuery(app, func(ctx *bluerpc.Ctx, query Query_Params) (*bluerpc.Res[Output], error) {

		return &bluerpc.Res[Output]{
			Body: Output{
				Greet: fmt.Sprintf("Hello mr %s , here is your message %s", query.Name, query.Message),
			},
		}, nil
	})

	userInfoQuery.Attach(usersRoute, "/greet")

}
