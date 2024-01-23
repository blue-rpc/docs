# Context
Context contains all of the incoming request data and all of the methods necessary to modify your response.


### Attachment()
Attachment sets the Content-Disposition header to make the response an attachment
```go
func (c *Ctx) Attachment(filename ...string) {
```
For example:
```go
proc := NewQuery[any, test_output](app, func(ctx *Ctx, query any) (*Res[test_output], error) {
       ctx.Attachment("./some-file.ts")

```

Is the same as 
```go
ctx.Set(“Content-Disposition”,’attachment; filename=”./some-file.ts”’)
```

### Cookie()

```go
func (c *Ctx) Cookie(cookie *http.Cookie) {
```

Sets a cookie on the response

### Get()
```go
func (c *Ctx) Get(key string) string {
```
Calls the Get method on the http header to get some value from the header given a key

### GetReqHeaders()

```go
func (c *Ctx) GetReqHeaders() map[string][]string {
```
Gives you the http request header. The header contains the request header fields sent by the client

### Hostname()

```go
func (c *Ctx) Hostname() string {
```
Hostname returns the hostname derived from the Host HTTP header.


### Ip()
```go
func (c *Ctx) IP() string {
```
IP returns the remote IP address of the request.

### Links()
```go
func (c *Ctx) Links(link ...string) {
```
Links sets the Link header in the HTTP response.

### Path()

```go
func (c *Ctx) Path(override ...string) string {
```

Path gets or sets the path part of the request URL.

### Protocol()
```go
func (c *Ctx) Protocol() string {
```
Returns the protocol used in the request . Either “http” or “https”


### Attachment()
```go
func (c *Ctx) Attachment(filename ...string) {
```
Attachment sets the Content-Disposition header to make the response an attachment. If a filename is provided, it includes it in the header.



