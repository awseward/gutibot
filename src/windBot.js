"use strict";

import { matchWholeWord } from './utils/regexUtils';

// TODO
const slackOut = require('./utils/slackUtils').outgoingWebhook;

const _containsWind = matchWholeWord.bind(null, 'wind');

function bot(request, respondOk, respondWith) {
  const text = slackOut.getText(request);

  if (!_containsWind(text)) { return respondOk(); }

  return respondWith('Can you paint with all the colors of the wiiiiind?');
}

export {
  bot as default,
};
