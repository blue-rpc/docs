# Procedures
Procedures are simply functions that are exposed to a client. 

They can be:
- Queries : For fetching data. Usually taking in some query parameters and returning an output
- Mutations : For sending data often for creating/updating/deleting a resource
Procedures are meant to be flexible. You can attach them to as many routes as you would like

## Creating procedures

You can create a procedure either through NewQuery() or NewMutation().

### NewQuery()
 
```go
func NewQuery[query any, output any](app *App, query Query[queryParams, output]) *Procedure[query, any, output] {
```
New query takes in 2 generic arguments
1. Query
2. Output
These 2 generic arguments are essential for the subsequent validation and Typescript generation 

The query should either be “any” or a struct
The output can be of any type depending on your needs.
If the query / output argument is “any” that means that you do not care about the query parameters that the users will send.

<important>
The order that you pass in your generic arguments does matter. The first argument should always be for query parameters and the second one should always be the output. In the case of mutations, the first argument is for the query, the second one is for the input and the third is for the output
</important>
<important>
Your structs must have their upper-case fields in order for them to be filled / verified properly. 
</important>

``` go
// WRONG
type query_params struct {
   id int 
}

// RIGHT
type query_params struct {
   Id int `paramName:"id"`
}
```

If your struct field is named differently than your query field you can use the `paramName` tag to tell BlueRPC to look for a specific key in the url, get that data and fill in the given query object in your handler with it. The `paramName` tag on the output struct also changes the field name on the subsequent response if you will respond with a JSON.

In the previous example a request with the query parameter of `id` will have its data transformed and placed into your uppercase `Id` struct field.


A query function will look like this

```go
type Query[query any, output any] func(ctx *Ctx, query query) (*Res[output], error)
```

Where you’ll take in a context and your query object and return a Res with the body of your output and an error.

Example

```go
...
type query_params struct {
   Id int `paramName:"id"`
}


type output struct {
   Message string `paramName:"message"`
}

func main() {
   app := bluerpc.New()
   nameQuery := bluerpc.NewQuery[query_params, output](app, 
   func(ctx *bluerpc.Ctx, query query_params) (*bluerpc.Res[output], error) {
       name, err := getName(query.Id)


       if err != nil {
           return nil, err
       }
       return &bluerpc.Res[output]{
           Body: output{
               Message: name,
           },
       }, nil
   })
   nameQuery.Attach(app, "/names")
}

```

Here in this example we pass in a query and an output struct as generic arguments. Then we pass in our app instance and out handler function

### NewMutation()
```go
func NewMutation[queryParams any, input any, output any](app *App, mutation Mutation[queryParams, input, output]) *Procedure[queryParams, input, output]
```

Mutations are used to change things on your server. They take in some sent data. Thus compared to queries they have another field called input. Inputs are the body of the requests

They take in a mutation handler which looks like :
```go
type Mutation[queryParams any, input any, output any] func(ctx *Ctx, queryParams queryParams, input input) (*Res[output], error)
```

All of the other things that we’ve mentioned on the NewQuery() section apply to mutations also
Example

```go
type query_params struct {
   Id int `paramName:"id"`
}
type input struct {
    NewName string `paramName:"newName"`
}

type output struct {
   Message string `paramName:"message"`
}

func main() {
   app := bluerpc.New()
   nameMutation := bluerpc.NewMutation[query_params, input, output](app,  
   func(ctx *bluerpc.Ctx, query query_params, input input) (*bluerpc.Res[output], error) {
       dbRes, err := db.ChangeName(query.Id, input.NewName)


       if err != nil {
           return err
       }
       return &bluerpc.Res[output]{
           Body: output{
               Message: dbRes.message,
           },
       }, nil
   })


   nameMutation.Attach(app, "/names")
}
```

<important>
Just like the query tag on your query structs you can put in the `paramName` tag on your inputs and output structs to tell BlueRPC to either look for your given key in the inputs and fill in the input field or change the key of that field in the subsequent response
</important>


## Dynamic Endpoints
A dynamic endpoint is an endpoint that can handle requests in a flexible manner, often returning customized or variable content based on the input or parameters provided. In contrast to static endpoints they can handle requests from more than just 1 endpoint

Dynamic endpoints typically utilize variable paths as parameters, allowing for more flexible request handling. In bluerpc put `:` after your path `/` to make the route dynamic

For example “/users/:id” will handle any request on /users/1, /users/2, /users/3 etc. or any string phrase for that matter.
```go
type query_params struct {
   Id int `paramName:"id"`
}


type output struct {
   Message string `paramName:"message"`
}


func main() {
   app := bluerpc.New()


   userInfoQuery := bluerpc.NewQuery[query_params, output](app, 
   func(ctx *bluerpc.Ctx, query query_params) (*bluerpc.Res[output], error) {
       return &bluerpc.Res[output]{
           Body: output{
               Message: fmt.Sprintf("Here is your ID: %d", query.Id),
           },
       }, nil
   })


   userInfoQuery.Attach(app, "/users/:id")
}
```

`userInfoQuery` will handle every route in `/users/` and it will put that end path (called slug) in your query struct just like any other query parameter. 

You should think of it as any other URL query parameter in that you need to put that slug as a field in your query parameter struct in order to access it. We put an `Id` field with the `paramName` of id in order for us to access that variable

<important>
Only procedures can be a dynamic endpoint
</important>

You can also define nested dynamic routes:

```go
type query_params struct {
   Id      int `query:"id"`
   PhotoId int `query:"photoId"`
}


type output struct {
   Message string `message:"name"`
}

func main() {
   app := bluerpc.New()


   userInfoQuery := bluerpc.NewQuery[query_params, output](app, 
   func(ctx *bluerpc.Ctx, query query_params) (*bluerpc.Res[output], error) {
       return &bluerpc.Res[output]{
           Body: output{
               Message: fmt.Sprintf("Here is your user ID and your photo ID: %d, %d", query.Id, query.PhotoId),
           },
       }, nil
   })


   userInfoQuery.Attach(app, "/users/:id/photos/:photoId")
}
```
### AcceptedContentType()
```go
func (p *Procedure[query, input, output]) AcceptedContentType(contentTypes ...string
```

This determines what kind of content type a request should have in order for it to be valid


## Handling Validation (Validator())
```go
func (p *Procedure[query, input, output]) Validator(fn validatorFn)  *Procedure[query, input, output] {
```
BlueRPC is flexible regarding validation, letting you define your own validation function / functions and attach them as needed. In case of query parameters and inputs we first create your query and input structures, fill them with the right data depending on your field types and then run your function on them. In the case of outputs we just run your function on your output struct.

In this example we will use the validator library from go-playground since it is so popular. 

Modifying our mutation example:
```go
// same query_params, input and output structs
...
func main() {
   app := bluerpc.New()
   validator := validator.New()
   nameMutation := bluerpc.NewMutation[query_params, input, output](app, 
   func(ctx *bluerpc.Ctx, query query_params, input input) (*bluerpc.Res[output], error) {
       dbRes, err := db.ChangeName(query.Id)


       if err != nil {
           return err
       }
       return &bluerpc.Res[output]{
           Body: output{
               Message: dbRes.message,
           },
       }, nil
   }).Validator(validator.Struct)
   nameMutation.Attach(app, "/names")
}
```

We pass in a function that looks like

```go
type validatorFn func(interface{}) error
```
Bluerpc will run that on your query and your inputs before running your handler and also on your output after running your handler

Keep in mind that you can set this validation function in the App config or on a particular router and it will trickle down to every one of your downstream procedures unless you’ve manually set a validation function on them.

<important>
If your validator function returns an error when run on your output (presumably because the output is invalid) the server will respond with a 500 and will panic using that error. This is to ensure that you do not send any data accidentally to the user
</important>


### Protected()
```go
func (p *Procedure[query, input, output]) Protected(a Authorizer)  *Procedure[query, input, output] {
```
Sets this procedure to be protected, meaning the authorization middleware will be called before it reaches the procedure's handler


### Attach()
```go
func (proc *Procedure[query, input, output]) Attach(route Route, slug string)
```

Attaches your procedure to a given app. In the earlier example we attached our created nameQuery and our nameMutation to our app on “/names”

### Authorizer()
```go
func (p *Procedure[query, input, output]) Authorizer(a Authorizer) *Procedure[query, input, output]{

```
Changes the Authorization settings for this particular procedure

### Validator ()
```go
func (proc *Procedure[query, input, output]) Validator(fn ValidatorFn) {
```
This sets a particular validation for the given procedure to be run 

