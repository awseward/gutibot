"use strict";

const unirest = require('unirest');
const request = require('request');

module.exports = function (req, res, next) {
  const botPayload = {};
  let definedWord, definedWords;
  const wordToDefine = req.body.text;
  if (!req.body.text) {
    return res.status(200).send('whops, something went wrong, annoy Michael');
  }

  const requestString = "https://wordsapiv1.p.mashape.com/words/" + wordToDefine + "/definitions";

  unirest.get(requestString)
  .header("X-Mashape-Key", "4iIoBDDoMimshMEHtO27Qzs1stjbp1j1yUmjsnVk4z1UHPtrab")
  .header("Accept", "application/json")
  .end(function (result) {
    definedWords = result.body.definitions;
    definedWord = definedWords[Math.floor(Math.random() * definedWords.length)].definition;

    botPayload.text = 'The definition of *' + wordToDefine + '* is: \n' +
      '&gt; ' + definedWord;
    botPayload.channel = req.body.channel_id;

    send(botPayload, function (error, status, body) {
      if (error) {
        return next(error);

      } else if (status !== 200) {
        // inform user that our Incoming WebHook failed
        return next(new Error('Incoming WebHook: ' + status + ' ' + body));

      } else {
        return res.status(200).end();
      }
    });
  });
};

function send (payload, callback) {
  const uri = 'https://hooks.slack.com/services/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';

  request({
    uri: uri,
    method: 'POST',
    body: JSON.stringify(payload),
  }, function (error, response, body) {
    if (error) {
      return callback(error);
    }

    callback(null, response.statusCode, body);
  });
}
