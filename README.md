## Project information

This is an Angular project showcasing the interface for user management, covering listing and performing CRUD operations on users.

For the API part, [json-server](https://github.com/typicode/json-server) was used with some additional middleware for validation.

Project can be run with `npm start` command, which uses [concurently](https://github.com/open-cli-tools/concurrently) to spin up both server and client applications.

`server/data.json` file simulates a database used by _json-server_

`server/server.js` file runs default _json-server_ implemetation as well as additional validation middleware
