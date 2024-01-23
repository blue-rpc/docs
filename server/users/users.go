package users

import "github.com/blue-rpc/bluerpc"

type query struct {
	Id string `paramName:"id" validate:"required"`
}

type output struct {
	Name     string `paramName:"name"`
	Email    string `paramName:"email"`
	isMature bool   `paramName:"isMature"`
}

func CreateUserRoute(app *bluerpc.App) {
	usersRoute := app.Router("/users")

	getUser := bluerpc.NewQuery[query, output](app, func(ctx *bluerpc.Ctx, query query) (*bluerpc.Res[output], error) {

		dbUser := getUserData(query.Id)

		return &bluerpc.Res[output]{
			Body: output{
				Name:     dbUser.Name,
				Email:    dbUser.Email,
				isMature: true,
			},
		}, nil

	})
	getUser.Attach(usersRoute, "/info")
}
