// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require('hbs');

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

// default value for title local
const projectName = 'lab-movies-celebrities';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

const bodyParser = require('body-parser')

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true}));

// 👇 Start handling routes here
const index = require('./routes/index');
app.use('/', index);

const celebrities = require('./routes/celebrities.routes');
app.use('/celebrities/new-celebrity', celebrities);

const movies = require('./routes/movies.routes');
app.use('/movies', movies);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
