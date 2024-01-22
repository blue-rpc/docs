Routers allow you to group procedures under a single prefix. For example all procedures attached to the router at /users will act upon requests coming to /users/…


```go
package main

import (
 "github.com/blue-rpc/bluerpc"
)   

type query struct {
   Id int `query:"id"`
}


func main() {
   app := bluerpc.New()

   usersRoute := app.Router("/users")


   getName := bluerpc.NewQuery[query, any](app, 
   func(ctx *bluerpc.Ctx, query query) (*bluerpc.Res[any], error) {
       userName := getName(query.Id)
       return &bluerpc.Res[any]{
           Body: fmt.Sprintf("Here is your requested user's name: %s", userName),
       }, nil
   })


   getName.Attach(usersRoute, "/name")
   app.Listen(":8080")
}
```



Here any GET requests on /users/name will be handled by the procedure

### Router()
```go
func (r *Router) Router(relativePath string){
```

Allows you to create a nested route from another route.


Example
```go
func main() {
   app := bluerpc.New()


   depthOneRoute := app.Router("/depth-one")
   depthTwoRoute := depthOneRoute.Router("/depth-two")


   idProcedure := bluerpc.NewQuery[...]

   idProcedure.Attach(depthTwoRoute, "/name")
   app.Listen(":8080")
}
```


Now any GET request on /depth-one/depth-two/name will be handled by the given procedure

### Static()
```go
func (r *Router) Static(prefix, root string, config ...*Static)
```


Exactly the same as the Static method on App. It delivers all files from a folder on request

On the prefix route by default it will deliver index.html


For example
```go
func main() {
   app := bluerpc.New()


   cdn := app.Router("/cdn")
   cdn.Static("/files", "./some-folder")
}

```
If you call /files by default you will get index.html from ./some-folder



### Use()

```go
func (r *Router) Use(middlewares ...Handler) {
```

Exactly the same as the Use() method on App. Attaches a middleware to a specific route


Middlewares are of the form
```go
func(Ctx *Ctx) error
```
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
   users := app.Router("/users")
   users.Use(CheckBearer)

}
```

### PrintInfo()

```go
func (r *Router) PrintInfo(){
```
Very similar to the same method in App().
It displays the info of the procedures and the routes attached to this route

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
	test.PrintRoutes()
	app.Listen(":8080")

}
```

will print :

```terminal
_____________________________________________
 Route : /test 
        query : /:id/banana ({ id: string,})=>{ fieldOneOut: string,}
_____________________________________________
```

(The text will be colored in your terminal )

### Validator ()
```go
func (r *Router) Validator(fn ValidatorFn) {
```
This sets a particular validation function for this route and all of the subsequent attached procedures / nested routes 
