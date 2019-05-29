# Caravela Website (setsail)

> O Caravela HC precisa de um meio visual e único de expor seus projetos em andamento, propostas, apresentação, dentre outras coisas mais. Para isso, um site está sendo desenvolvido para melhorar sua divulgação e alcance.
> @jptiz

## Build Setup

First of all, you'll need [npm](https://github.com/npm/cli) to download and manage dependencies, so start with

``` bash
npm install
```

Now, we're using a lot of pre-processed assets and stuff, so let's go to the webpack nasty stuff (hehehe). You can try to execute webpack by yourself and change the way the project is being bundle on the webpack.prod.js and webpack.dev.js files, but if you're not familiarized with that, just run

```bash
npm run build
```

or for file watching

```bash
npm run build -- --watch
```

Last but not least important, to serve your files, you can just use node on the /server/index.js:

```bash
node ./server/index.js
```

or if you want file watching again, [nodemon](https://github.com/remy/nodemon) is your guy. We're already packing it with this project, so to use it, run:

```bash
nodemon ./server/index.js
```

If you console shows something like ```Server listening at port 80``` you're good to go (if you want to change server port, just modify it in the /server/index.js file).



## Database Schema

Database was implemented on PostgreSQL, so some things we'll be different from another SGBD's e.g. SERIAL field 

### Crew ('crew' table)

Field name  | Field type   | Description
------------| -------------| -------------
id          | SERIAL       | Self explained 
name        | VARCHAR      | Username on github 
github      | TEXT         | Profile url 
pic         | TEXT         | Avatar image url 
description | TEXT         | Bio on github 
created_at  | TIMESTAMP    | First joined 
updated_at  | TIMESTAMP    | Last time data was updated 
deleted_at  | TIMESTAMP    | When user was OBLITERATED



## API

Most of the API is currently closed, so you can't just obliterate all of us, but because all our data is public and easily findable via the Github API, get requests are open and you can use them like below:

### GET /crew

- Base URL: ```http://jvm.life/crew```
- Route description: Get all members 
- Response format:

```json
[
    {
        "id":1,
        "name":"Joao Vitor",
        "github":"https://github.com/leviosar",
        "pic":"https://avatars1.githubusercontent.com/u/32309818?s=400&u=1f952b04675296f8d025f67780d04a9ad089410f&v=4",
        "created_at":"2019-04-29T03:16:08.543Z",
        "updated_at":"2019-05-27T21:53:34.799Z",
        "deleted_at":null,
        "description":"Awesome"
    },
]
```

### GET /crew/:id

- Base URL: ```http://jvm.life/crew/:id```
- Route description: Get a member from given id
- Response format:

```json
[
    {
        "id":1,
        "name":"Joao Vitor",
        "github":"https://github.com/leviosar",
        "pic":"https://avatars1.githubusercontent.com/u/32309818?s=400&u=1f952b04675296f8d025f67780d04a9ad089410f&v=4",
        "created_at":"2019-04-29T03:16:08.543Z",
        "updated_at":"2019-05-27T21:53:34.799Z",
        "deleted_at":null,
        "description":"Awesome"
    },
]
```

If you're willing to implement the /server folder which contains our API, just use the schema in the [schema section](#database-schema) and call the routes like this:

### PUT /crew/:id

- Base URL: ```http://yourapiserver/crew/:id```
- Route description: Update a member from given id and new fields
- Body request format:

```json
[
    {
        "name":"Joao Vitor",
        "github":"https://github.com/leviosar",
        "pic":"https://avatars1.githubusercontent.com/u/32309818?s=400&u=1f952b04675296f8d025f67780d04a9ad089410f&v=4",
        "description":"Awesome"
    },
]
```

(You can omit any of those fields and only the given fields will be updated)

### POST /crew

- Base URL: ```http://yourapiserver/crew```
- Route description: Create a member from given data fields
- Body request format:

```json
[
    {
        "name":"Joao Vitor",
        "github":"https://github.com/leviosar",
        "pic":"https://avatars1.githubusercontent.com/u/32309818?s=400&u=1f952b04675296f8d025f67780d04a9ad089410f&v=4",
        "description":"Awesome"
    },
]
```

(Fields are not nullable if you don't make them in the database)

### DELETE /crew/:id

- Base URL: ```http://yourapiserver/crew/:id```
- Route description: Obliterate a member from given id