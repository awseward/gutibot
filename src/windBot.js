"use strict";

const slackOut = require('./utils/slackUtils').outgoingWebhook;
const regex = require('./utils/regexUtils');

const _containsWind = regex.matchWholeWord.bind(null, 'wind');

function bot(request, respondOk, respondWith) {
  const text = slackOut.getText(request);

  if (!_containsWind(text)) { return respondOk(); }

  return respondWith('Can you paint with all the colors of the wiiiiind?');
}

module.exports = bot;
