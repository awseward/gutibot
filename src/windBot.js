"use strict";

const slackOut = require('./utils/slackUtils').outgoingWebhook;

function _containsWind(str) {
  // NOTE: This will return an array on success, but that is truthy, so that's
  // enough to go on... (Still not sure how I feel about this, though)
  return (str || '').match(/(^|\s)wind(\s|$|\W)/i);
}

function bot(request, respondOk, respondWith) {
  const text = slackOut.getText(request);

  if (!_containsWind(text)) { return respondOk(); }

  return respondWith('Can you paint with all the colors of the wiiiiind?');
}

module.exports = bot;
