"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const barelyBot = require("./barelyBot").bot;
const defineBot = require("./defineBot");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello! This is gutibot. Are you lost?');
});

app.post("/doesheknower", barelyBot);
app.post("/define", defineBot);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(400).send(err.message);
});

app.listen(port, () => console.log("Listening on port " + port));
