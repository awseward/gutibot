'use strict';

import { matchWholeWord } from './utils/regexUtils';
import { outgoingWebhook as slackOut } from './utils/slackUtils';

const _containsNeck = matchWholeWord.bind(null, 'neck');
const _containsBack = matchWholeWord.bind(null, 'back');

function bot(request, respondOk, respondWith) {
  const text = slackOut.getText(request);

  if (_containsNeck(text) || _containsBack(text)) {
    return respondWith('My neck, my back...');
  }

  return respondOk();
}

export {
  bot as default,
};
