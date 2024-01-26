# Authentication and Authorization

BlueRPC lets you create middlewares to authorize your users and also implement protection for your routes and procedures. A protected procedure is one in which your authorization function will run before reaching that procedure's handler. You will also be able to pass on data from your authorization middleware

When you create a BlueRPC app you can put in your configuration a field called Authorizer

```go
//Sets the default authorization settings for the app, including the authorization middleware.
type Authorizer struct {
	Handler AuthHandler
}
```

You can easily make an Authorizer struct by calling

```go
func NewAuth(handler AuthHandler) *Authorizer {
```

The Handler inside your Authorizer will be the middleware that runs on your authorized procedures.

```go
type AuthHandler func(ctx *Ctx) (any, error)
```

If a user is not authorized you can just return an error. BlueRPC will make that a 401 response by default.

You can also pass down data to your handlers through that first return argument. Here's an example:

```go
func main() {
	...
	type userData struct {
		Token string
	}
	app := bluerpc.New(&bluerpc.Config{
		Authorizer: bluerpc.NewAuth(func(ctx *bluerpc.Ctx) (any, error) {
			token := ctx.Get("Authorization")

			if !strings.HasPrefix(token, "Bearer")  {
				return nil, fmt.Errorf("UNAUTHORIZED")
			}

			sessionUserData := userData{
				Token: bearer,
			}
			return sessionUserData, nil
		}),
	})
	...
}
```

In this case we do a simple check for a token. If the user is authorized we return a userData struct. We will be able to access this struct our handler now.

#### Keep in mind that you can change your authorization function on specific routers and procedures too. All attached procedures alongisde all nested routes and their procedures from a router will have those authorization settings passed down.

You can create normal unprotected routes that will authenticate your users. Then you can proceed to call these authorized routes.
## Protecting procedures

We can easily make a procedure protected by calling the Protected() method on them. We can also get that passed data from our authorization function by calling the function GetAuth() on our context

```go
func main() {
...
	exampleProc := bluerpc.NewQuery[any, example_output](app,
		func(ctx *bluerpc.Ctx, query any) (*bluerpc.Res[example_output], error) {
			user := bluerpc.GetAuth[userData](ctx)

			return &bluerpc.Res[example_output]{
				Body: example_output{
					Message: fmt.Sprintf("here is your token : %s", user.Token),
				},
			}, nil
		}).Protected()
...
}
```

### GetAuth()
```go
func GetAuth[authType any](ctx *Ctx) {
```
GetAuth is a function that allows you to get your authorization data in a typesafe way. It takes in a generic argument that determines how that auth data should look like. 

<important>
If your procedure is not authorized or if your given generic argument type does not match what was returned from your authorization function then this function will cause a panic
</important>



Now let's start a server
```go

type userData struct {
		Token string
	}

type example_output struct {
	Message string `paramName="message"`
}
func main() {
	app := bluerpc.New(&bluerpc.Config{
		Authorizer: bluerpc.NewAuth(func(ctx *bluerpc.Ctx) (any, error) {
			token := ctx.Get("Authorization")

			if !strings.HasPrefix(token, "Bearer") {
				return nil, fmt.Errorf("UNAUTHORIZED")
			}

			sessionUserData := userData{
				Token: token,
			}
			return sessionUserData, nil
		}),
	})

	exampleProc := bluerpc.NewQuery[any, example_output](app,
		func(ctx *bluerpc.Ctx, query any) (*bluerpc.Res[example_output], error) {
			user := bluerpc.GetAuth[userData](ctx)

			return &bluerpc.Res[example_output]{
				Body: example_output{
					Message: fmt.Sprintf("here is your token : %s", user.Token),
				},
			}, nil
		}).Protected()

	exampleProc.Attach(app, "/example",)
	if err := app.Listen(":8080"); err != nil {
		panic(err)
	}
}
```
Doing a request on /example with no headers set will give us by default
```json
{
  "Message": "UNAUTHORIZED"
}
```
While setting the Authorization headers to be "Bearer 123" will give us 
```json
{
  "Message": "here is your token : Bearer 123"
}
```
### Typescript Generation
All protected procedures have by convention an underscore ("_") before their procedure type (query, mutation etc.) in the generated typescript. There is no particular reason for the underscore representing a procedure besides making those procedures stand out.

In our case our example proc generated this typescript
```ts
export const rpcAPI ={example:{_query: async [...]},}
```
Query starts with an underscore due to the routes being protected
