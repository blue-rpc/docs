# App 
The app is the central struct of bluerpc. It is where all of your other routes will be created from
You can create an app with the New() function.

``` go
package main
import (
   "github.com/blue-rpc/bluerpc"
)

func main() {
   app := bluerpc.New()
}
```


This function take a config struct 

```go

type Config struct {
	//  The path where you would like the generated Typescript to be placed.
	// Keep in mind that YOU NEED TO PUT a .ts file at the end of the path
	// Default is ./output.ts
	OutputPath string

	// Boolean that determines if any typescript types will be generated.
	// Default is false. Set this to TRUE in production
	DisableGenerateTS bool

	//The function that will be used to validate your struct fields.
	ValidatorFn validatorFn

	//Disables the fiber logger middleware that is added.
	//False by default. Set this to TRUE in production
	DisableRequestLogging bool

	// by default Bluerpc transforms every error that is sent to the user into a json by the format  ErrorResponse. Turn this to true if you would like fiber to handle what form will the errors have or write your own middleware to convert all of the errors to your liking
	DisableJSONOnlyErrors bool

	//This middleware catches all of the errors of every procedure and handles responding in a proper way
	//By default it is DefaultErrorMiddleware
	ErrorMiddleware Handler

	//the URL of the server. If left empty it will be interpreted as localhost
	ServerURL string

	//disable the printing of that start server message
	DisableInfoPrinting bool

	//determines the default cors origin for every request that comes in
	CORS_Origin string

	//The address that your SSL certificate is located at
	SSLCertPath string

	//The address that your SSL key is located at
	SSLKey string
}

```


### Router()
```go
func (r *Router) Router(relativePath string) *Router {
```

This function creates a router that you can use in your app at that particular path
For example
```go
package bluerpc

func main() {
   app := bluerpc.New()


   usersRoute := app.Router("/users")
}
```


### Listen()
```go
func (a *App) Listen(port string) error {

```

This will start your server on your given port. It will also trigger the generation of the typescript file at your given address in the config settings that you've provided when you created App

### Use()

```go
func (a *App) Use(middleware Handler) *App {
```

Attaches a middleware to a specific route
Middlewares are of the form
```go
func(Ctx *Ctx) error
```

Here's an example
```go
func CheckBearer(ctx *bluerpc.Ctx) error {
   session := ctx.Get("session")


   if !strings.HasPrefix(session, "bearer") {
       return &bluerpc.Error{
           Code:    401,
           Message: "Unauthorized",
       }
   }
   return nil
}
func main() {
   app := bluerpc.New()
   app.Use(CheckBearer)

}
```

### Static()
```go
func (a *App) Static(prefix, root string, config ...*Static)
```

Delivers all files from a folder on request
On the prefix route by default it will deliver index.html
For example


```go

func main() {
   app := bluerpc.New()
   app.Static("/someRoute", "./some-folder")

}
```




By default if you would do a GET request on /someRoute you would get index.html. If you have a file called assets.css in some-folder you could get it by doing a request on ./some-folder/assets.css

### Test()

```go
func (a *App) Test(req *http.Request, port ...string) (*http.Response, error) {
```

Tests a specific http request and returns the response. This is useful when doing tests.

For example :

```go
func main() {
   app := bluerpc.New()
   req, err := http.NewRequest("GET", "http://localhost:8080/", nil)
   if err != nil {
       panic(err)
   }
   res, err := app.Test(req)
}

```



### PrintInfo()

```go
func (a *App) PrintInfo(){
```

Prints a nice console log message that displays all of the routes and all of the procedures on an app

For example 
```go


type test_local_query struct {
	Id string `paramName:"id" validate:"required"`

}

type test_output struct {
	FieldOneOut   string   `paramName:"fieldOneOut" validate:"required"`
}

func TestSomething(t *testing.T) {
	
	app := New()

	proc := NewQuery[test_local_query, test_output]([...])
	test := app.Router("/test")

	proc.Attach(test, `/:id/banana`)
	app.PrintRoutes()
	app.Listen(":8080")

}
```

will print :

```terminal
_____________________________________________
 Route : /  No Procedures 
 Route : /test 
        query : /:id/banana ({ id: string,})=>{ fieldOneOut: string,}
_____________________________________________
```

(The text will be colored in your terminal when you call the function compared to our example here in the docs)