# Caravela Website (setsail) - Frontend

> O Caravela HC precisa de um meio visual e único de expor seus projetos em andamento, propostas, apresentação, dentre outras coisas mais. Para isso, um site está sendo desenvolvido para melhorar sua divulgação e alcance.
> @jptiz

## Build

First of all, you'll need [npm](https://github.com/npm/cli) to download and manage dependencies, so start with

``` bash
npm install
```

Now, we're using a lot of pre-processed assets and stuff, so let's go to the webpack nasty stuff (hehehe). You can try to execute webpack by yourself and change the way the project is being bundle on the vue.config.js, but if you're not familiarized with that, just run to production build

```bash
npm run build
```

or for development build (with a test server and file watching)


```bash
npm run serve
```

Production build needs to be served at HTTP protocol, if you simply open the /dist/index.html file it's going to be blank. That's caused by the chunk processing on assets like js an css.

## Learn

If you want to learn more about the technologies we used at this project, i'm listing below some introduction materials

- [Vue.js docs](https://vuejs.org/v2/guide/)
- [Flavio Copes website](https://flaviocopes.com/tags/vue/)
- [Article about webpack by Anton Melnyk](https://dev.to/pixelgoo/how-to-configure-webpack-from-scratch-for-a-basic-website-46a5)
- [Typescript docs](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [Sass docs](https://sass-lang.com/documentation)