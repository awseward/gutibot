'use strict';

import strUtils from './utils/stringUtils';
import { linkifyUsername } from './utils/slack/commonUtils';
import { outgoingWebhook as slackOut } from './utils/slackUtils';

function getMatches(str) {
  const pattern = /(\w{2,}er)[^\w]+|(\w{2,}er)$/gi;

  return str.match(pattern) || [];
}

function _cleanMatches(matches) {
  const pattern = /[^\w]+$/;

  return matches.map(str => {
    return str.replace(pattern, '');
  });
}

function _splitByEr(word) {
  return strUtils.splitWord(word, 'er');
}

function _formatSplitWordParts(parts) {
  const capFirst = strUtils.capitalizeFirstCharacter;

  return `${capFirst(parts[0])} '${parts[1]}`;
}

function _getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function _isTwentyFivePercentChance() {
  return _getRandomInt(0, 4) === 0;
}

function _shouldRespond(matches) {
  return matches.length !== 0 && _isTwentyFivePercentChance();
}

function _buildMessage(username, matches) {
  const linkifiedUsername = linkifyUsername(username);

  const blankEr = matches
    .map(_splitByEr)
    .map(_formatSplitWordParts)
    .join(' ');

  return `${linkifiedUsername}: ${blankEr}?! I barely know 'er!`;
}

function bot(request, respondOk, respondWith) {
  const text = slackOut.getText(request);
  const username = slackOut.getUsername(request);
  const matches = _cleanMatches(getMatches(text));

  if (!_shouldRespond(matches)) { return respondOk(); }

  const message = _buildMessage(username, matches);

  return respondWith(message);
}

export {
  getMatches,
  bot as default,
};
