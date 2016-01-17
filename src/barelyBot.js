"use strict";

const gutiBot = require('./gutiBot');
const slack = require('./utils/slackUtils');
const strUtils = require('./utils/stringUtils');

function getMatches(str) {
  const pattern = /(\w{2,}er)[^\w]+|(\w{2,}er)$/gi;

  return str.match(pattern) || [];
}

function _cleanMatches(matches) {
  const pattern = /[^\w]+$/;

  return matches.map(str => {
    return str.replace(pattern, "");
  });
}

function _splitByEr(word) {
  return strUtils.splitWord(word, "er");
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

// NOTE: This will probably not be quite as simple and straightforward since it
// will be happening asynchronously, but this will do as a placeholder for the
// time-being
function _isDictionaryWord(word) {
  // TODO: Actually implement this.
  return _isTwentyFivePercentChance();
}

function _getDictionaryWords(words) {
  return words.filter(_isDictionaryWord);
}

function _isSlackbot(username) {
  return username === 'slackbot';
}

function _performDictionaryLookupsAndMaybePostBack(request, matches) {
  // TODO
}

function bot(req, res) {
  const text = req.body.text;
  const username = req.body.user_name;
  const matches = _cleanMatches(getMatches(text));

  if (!_isSlackbot(username)) {
    _performDictionaryLookupsAndMaybePostBack(req, matches);
  }

  return gutiBot.respondOk(res);
}

module.exports = {
  getMatches,
  bot,
};
