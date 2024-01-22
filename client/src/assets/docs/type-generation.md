Bluerpc will generate a typescript file with an object that will allow you to do an API call to your backend. Those API calls are based on what inputs and outputs your procedures have and on which path they are attached.


This typescript file gets generated every time the `Listen()` `App` method runs . Keep in mind that you can disable it by setting `DisableGenerateTS`to true in your app config. 


Here’s an example	

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


   usersRoute := app.Router("/users")
   userInfoQuery := bluerpc.NewQuery[query_params, output](app, 
   func(ctx *bluerpc.Ctx, query query_params) (*bluerpc.Res[output], error) {
       return &bluerpc.Res[output]{
           Body: output{
               Message: fmt.Sprintf("Here is your user ID %d", query.Id),
           },
       }, nil
   })


   userInfoQuery.Attach(usersRoute, "/info")
   app.Listen(":8080")
}


```

This code snippet would create you a typescript file that exports an object called rpc.
```ts

export const rpc = {
 users: {
   info: {
     query: async (query: {
       id?: number ;
     }): Promise<{ message?: string  }> => {
       return rpcCall({ query }, "/users");
     },
   },
 },
} as const;
```

You can import this object wherever you need it in your app. 

# How the typescript file is generated
Each nested route from an app will generate a field on that object
In our previous example, the “users” field was generated because we’ve created usersRoute at /users

```go
 usersRoute := app.Router("/users")
```
Each procedure will create a nested field and either a “query” or a “mutation” method depending on its procedure type.

In this  case our code created a nested field called “info” on the users field because that’s where our procedure was attached
```go
   userInfoQuery.Attach(usersRoute, "/info")
```

In case of a Query the generated method will look like this

```ts
(query : Object)=> Object
```

The query object type and the output type will match your given struct generic arguments.

In case of a mutation the generated method will look like this 
```ts
({query : Object, input: Object})=> output
```
The resulting query, input and output type can be also be `any` if you pass in `any` as the generic argument for that procedure


Regarding each field in a struct the resulting Typescript type will be:
- `string` if shockingly, the field is a `string`
- `boolean` if the field is a `boolean`
- `number` if the field is any `uint`, `int` and `float` type

For any non-primitive type like maps or slices the same conversion rules apply when converting their composing primitives. Thus you will get:
- `Array<${Type}>` if the field is a slice []Type or an array [size]Type (size will be ignored)
- `Record<{FirstType}, {SecondType}>` if the field is a `map[FirstType]SecondType`.
 
<important>

If you want your resulting typescript field to not be optional you also need to include `required` tag in your struct field or the required field in a `validate` tag
```go
type query_params struct {
   Id int `required`
}

//or
type query_params struct {
   Id int `validate:"required"`
}


```

</important>
