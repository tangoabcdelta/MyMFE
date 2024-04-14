# Generate

```bash
express -h

Usage: express [options] [dir]

  Options:
-h, --help          output usage information
-V, --version       output the version number
-e, --ejs           add ejs engine support (defaults to jade)
    --hbs           add handlebars engine support
-H, --hogan         add hogan.js engine support
-c, --css <engine>  add stylesheet <engine> support (less|stylus|compass|sass) (defaults to plain css)
    --git           add .gitignore
-f, --force         force on non-empty directory
```

##### Steps

- Create and navigate into the app directory.
- Generate.
- Use NPM to install dependencies.
- Start the server
- Open a browser and navigate to: http://localhost:3000/

```bash
mkdir base
cd base
express --ejs --git .
npm install
DEBUG=base:* npm start
```

#### View engine setup

```js
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
```
