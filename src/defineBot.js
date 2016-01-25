"use strict";

// TODO: Maybe test
// TODO: Use slack/http utils and whatnot
// TODO: Potentially pull dictionary lookup stuff out to some util

// TODO: Use import
const unirest = require('unirest');
// TODO: Use utils/httpClient
const request = require('request');

// TODO: Use export
// TODO: Break this up
module.exports = function (req, res, next) {
  const botPayload = {};
  let definedWord, definedWords;
  const wordToDefine = req.body.text;
  if (!req.body.text) {
    return res.status(200).send('whops, something went wrong, annoy Michael');
  }

  // TODO: Interpolate
  const requestString = "https://wordsapiv1.p.mashape.com/words/" + wordToDefine + "/definitions";

  // TODO: Pull mashape stuff out
  unirest.get(requestString)
  .header("X-Mashape-Key", "4iIoBDDoMimshMEHtO27Qzs1stjbp1j1yUmjsnVk4z1UHPtrab")
  .header("Accept", "application/json")
  .end(function (result) {
    definedWords = result.body.definitions;
    definedWord = definedWords[Math.floor(Math.random() * definedWords.length)].definition;
		// TODO: ^^^ Error ^^^
		// TypeError: Cannot read property 'length' of undefined
		//     at /app/dist/defineBot.js:19:71
		//     at Request.handleRequestResponse [as _callback] (/app/node_modules/unirest/index.js:461:25
		//     at Request.self.callback (/app/node_modules/request/request.js:373:22)
		//     at emitTwo (events.js:87:13)
		//     at Request.emit (events.js:172:7)
		//     at Request.<anonymous> (/app/node_modules/request/request.js:1318:14)
		//     at emitOne (events.js:82:20)
		//     at Request.emit (events.js:169:7)
		//     at IncomingMessage.<anonymous> (/app/node_modules/request/request.js:1266:12)
		//     at emitNone (events.js:72:20)

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

// TODO: Use promises
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
