# Caravela Website (setsail) - Backend

> O Caravela HC precisa de um meio visual e único de expor seus projetos em andamento, propostas, apresentação, dentre outras coisas mais. Para isso, um site está sendo desenvolvido para melhorar sua divulgação e alcance.
> @jptiz

Our backend is basically a webscraper to fetch some github's API data and a REST API to serve those data. We did it that way so github's api rate limit wont cause any problem. With all said, it's written in Typescript using express.js and node-pg.

## Build

First of all, you'll need [npm](https://github.com/npm/cli) to download and manage dependencies, so start with

``` bash
npm install
```

We're using [dotenv](https://www.npmjs.com/package/dotenv) to manage secrets, so in the project root there's a .env.example file with the following template:

```env
DB_USER=useruser
DB_HOST=0.0.0.0
DB_DATABASE=dbname
DB_PASSWORD=supersecret
DB_PORT=5432
MODE=production
GIT_USER=user
GIT_PASS=ultrasecret
```

The only observation i really have to do it's the "GIT_PASS" variable it's not your github email's, but really the username, the /something in your url. Those variables are used to do a Basic Auth into github's API and raise your rate_limit 

The tsconfig.json needed to compile Typescript is already built so you'll only need to run ``` tsc -w ``` to run Typescript in watchmode, outdir/outfile is set to be the same folder and name of the target files, as we working on a server context, no need to minifying.

Last but not least important, to serve your files, you can just use node on the /index.js:

```bash
node ./index.js
```

or if you want file watching again, [nodemon](https://github.com/remy/nodemon) is your guy. We're already packing it with this project, so to use it, run:

```bash
nodemon ./server/index.js
```

If you console shows something like ```Server listening at port 80``` you're good to go (if you want to change server port, just modify it in the /server/index.js file).

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


## Learn

- [Express docs](https://expressjs.com/en/starter/installing.html)
- [Node-pg docs](https://node-postgres.com/)
- [Github API](https://developer.github.com/v3/)