GraphQL Challenge
-----------------

This is an example graphql service using barebones Express, GraphQL Syntax schema, and simple api resolution.

## Dependencies
Please have Docker, Docker-compose, Node, NPM and Make installed on your system.

## Quickstart
Copy the `dist.env` file to `.env` and fill the two environment variables with your client id and secret from [GitHub OAuth Applications][1] then run:
```bash
make install build up
```

Then navigate to [http://localhost:8080/home](http://localhost:8080/home)

## Long setup
### Install
```bash
make install
```
or
```bash
npm install
```

### Build
```bash
make build
```
or
```bash
docker-compose build
```

### Run
```bash
make up
```
or
```bash
docker-compose up
```

[1]: https://github.com/settings/applications/new