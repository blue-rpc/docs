module github.com/blue-rpc/docs

go 1.21.4

replace github.com/blue-rpc/bluerpc => ../../blueRPC

require (
	github.com/algolia/algoliasearch-client-go/v3 v3.31.0
	github.com/blue-rpc/bluerpc v0.7.6
	github.com/google/uuid v1.5.0
	github.com/joho/godotenv v1.5.1
)

require github.com/gorilla/schema v1.2.1 // indirect
