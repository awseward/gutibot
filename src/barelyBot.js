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

function _shouldRespond(username, matches) {
  return username !== 'slackbot'
    && matches.length !== 0
    && _isTwentyFivePercentChance();
}

function bot(req, res) {
  const text = req.body.text;
  const username = req.body.user_name;
  const matches = _cleanMatches(getMatches(text));
  const linkify = strUtils.linkifySlackUsername;

  if (!_shouldRespond(username, matches)) {
    return gutiBot.respondOk(res);
  }

  const blankEr = matches
    .map(_splitByEr)
    .map(_formatSplitWordParts)
    .join(" ");

  const message = `${linkify(username)}: ${blankEr}?! I barely know 'er!`;

  return gutiBot.respondWith(res, message);
}

module.exports = {
  getMatches,
  bot,
};
