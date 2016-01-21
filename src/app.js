"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const gutibot = require("./gutiBot");

const barelyBot = require("./barelyBot").bot;
const defineBot = require("./defineBot");
const windBot = require("./windBot");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello! This is gutibot. Are you lost?');
});

app.post("/define", defineBot);
app.post("/doesheknower", gutibot.doSync(barelyBot));
app.post("/wind", gutibot.doSync(windBot));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(400).send(err.message);
});

app.listen(port, () => console.log("Listening on port " + port));
