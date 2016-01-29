'use strict';
import express from 'express';
import bodyParser from 'body-parser';

import { doSync } from './gutiBot';
import barelyBot from './barelyBot';
import defineBot from './defineBot';
import neckAndBackBot from './neckAndBackBot';
import windBot from './windBot';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello! This is gutibot. Are you lost?');
});

app.post('/barely', doSync(barelyBot));
app.post('/define', defineBot);
app.post('/neckAndBack', doSync(neckAndBackBot));
app.post('/wind', doSync(windBot));


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(400).send(err.message);
});

app.listen(port, () => console.log('Listening on port ' + port));
