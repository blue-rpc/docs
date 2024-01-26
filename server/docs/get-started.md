
# Why BlueRPC :
Apps should be as type safe as they can be. Type safety lets you move faster, fix less bugs and be more confident in what you're deploying. 

Unfortunately there is no easy lightweight solution to connect a golang backend and a typescript frontend safely. Yet remaining in a javascript backend environment has serious drawbacks. Other solutions such as GraphQL or gRPC are rather verbose, requiring you to create intermediate files that describe the structure of your endpoints alongside other things.

BlueRPC is a tRPC inspired backend framework that lets you define a type safe golang server and in turn get a typescript file with everything you need to be able to call that server. It lets you move faster and be more confident that you won't have bugs. 

<note>
This project is in active development. Features and implementations may evolve at a rapid rate. Your contributions are welcome on our GitHub page.
</note>



## Quickstart

You first need to create a new instance of a BlueRPC App

```go
package main

import (
	"github.com/blue-rpc/bluerpc"
)

func main() {
	app := bluerpc.New()
    ...
}
```


Then you need to create a procedure. Procedures can be either Query or Mutation. You attach struct types to these procedures in order to determine what are the acceptable query parameters, input or outputs of them.
We will create a query in this case. They can have different query parameters and different outputs.

#### Start your struct fields with an upper case so that they can be read by BlueRPC. Include the `paramName` tag to say "this field will be named ... in my request query / input or in my output body response"


Return a pointer to a Res struct type at the end of your function. The body must be the type of your output.

```go
{
    ...
	type Query_Params struct {
		Id string `paramName:"id"`
	}

	type Output struct {
		Message string `paramName:"message"`
	}

	HelloWorld := bluerpc.NewQuery[Query_Params, Output](app, 
    func(ctx *bluerpc.Ctx, query Query_Params) (*bluerpc.Res[Output], error) {
		return &bluerpc.Res[Output]{
			Body: Output{
	            Message: fmt.Sprintf("hello world, here is your id: %s", query.Id)
			},
		}, nil
	})
    ...
}
```
Attach your procedure to your App at some endpoint and then run Listen()
```go 
//main.go
package main

import (
	"github.com/blue-rpc/bluerpc"
)

func main() {
	app := bluerpc.New()

	type Query_Params struct {
		Id string `paramName:"id"`
	}

	type Output struct {
		Message string `paramName:"message"`
	}

	HelloWorld := bluerpc.NewQuery[Query_Params, Output](app, 
    func(ctx *bluerpc.Ctx, query Query_Params) (*bluerpc.Res[Output], error) {
		return &bluerpc.Res[Output]{
			Body: Output{
				Message: fmt.Sprintf("hello world, here is your id : %s ", query.Id),
			},
		}, nil
	})
	HelloWorld.Attach(app, "/greet")
	app.Listen(":8080")
}
```
Then run this in your terminal:
```bash
go run main.go
```
Now do a request on http://localhost:8080/greet?id=123 and you should get
```JSON
{
  "message": "hello world, here is your id : 123 "
}
```

You will now get a typescript file with an exported object. Use this object to call all of your fetches from your frontend.
```ts
...
export const rpc ={
    greet:{
        query: async (query:{ id?: string,})
                :Promise<{ message?: string,}>
                =>{[...]}as const;
    }
}
```

### Using validation
You can use your favorite validation library to validate your procedure’s inputs and outputs. Just put a validation function that will validate your structs when creating an App.

//We will use [go validator](https://github.com/go-playground/validator) in this example
```go
package main
import (
	"testing"
    "github.com/blue-rpc/bluerpc"
	"github.com/go-playground/validator/v10"
)

func main() {
	validate := validator.New(validator.WithRequiredStructEnabled())


    app := bluerpc.New(&bluerpc.Config{
		ValidatorFn:         validate.Struct,
	})
}
```
Now your attached structs to any procedure will be validated your inputs before reaching your handler and your outputs after


## Why not gRPC?
The main issue with gRPC is that it is very verbose. It requires you to create intermediate files that describe your endpoints in a language other than golang.

Although BlueRPC and gRPC share 'RPC' in their names, they are not very similar. BlueRPC tries to only require you to define your routes once and in golang while taking care of everything else. It is also designed to be used for communication between a public client and a server compared gRPC's communication between servers written in different programming languages.

If runtime speed is of the essence or if you will need to call this server from anything else but a javascript environment then you should definitely use gRPC! 
## Why not tRPC? 

There are two main reasons for this :
 - tRPC is slow at runtime, especially if you want to add validation libraries like Zod
 - BlueRPC is in GO ecosystem

Yet there are some advantages that tRPC still has. It exists in the JS ecosystem (if you would prefer that for some reason) and it lets you go from the type definitions to the endpoint functions immediately in an IDE. 

If runtime performance is not an issue or if you want to remain in a javascript backend environment you should definitely use tRPC instead.

