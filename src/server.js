"use strict";

const express = require("express");
const app = express();
const notFoundHandler = require("./error-handlers/404");
const errorHandler = require("./error-handlers/500");
const validator = require("./middleware/validator");
const logger = require("./middleware/logger");
const moviesRouter = require('./routes/movies.route');
const booksRouter = require('./routes/books.route');


app.use(logger);
app.use(express.json());
app.use(moviesRouter);
app.use(booksRouter);

app.get("/", (req, res) => {
  res.status(200).send("Server is Up & Running!");
});

app.get("/person", validator, (req, res, next) => {
  const userName = req.query.name;
  res.json({ name: userName });
});

app.use("*", notFoundHandler);
app.use(errorHandler);

function start(port) {
  app.listen(port, () => {
    console.log(`Server is Running on port ${port}`);
  });
}

module.exports = { app, start };
