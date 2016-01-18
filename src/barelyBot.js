"use strict";

const strUtils = require('./stringUtils');
const gutiBot = require('./gutiBot');
const slack = require('./utils/slackUtils');

function getMatches(str) {
  const pattern = /(\w{2,}er)[^\w]+|(\w{2,}er)$/gi;

  return str.match(pattern) || [];
}

function cleanMatches(matches) {
  const pattern = /[^\w]+$/;

  return matches.map(str => {
    return str.replace(pattern, "");
  });
}

function splitByEr(word) {
  return strUtils.splitWord(word, "er");
}

function formatSplitWordParts(parts) {
  const capFirst = strUtils.capitalizeFirstCharacter;

  return `${capFirst(parts[0])} '${parts[1]}`;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function isTwentyFivePercentChance() {
  return getRandomInt(0, 4) === 0;
}

function shouldRespond(username, matches) {
  return username !== 'slackbot'
    && matches.length !== 0
    && isTwentyFivePercentChance();
}

function bot(req, res) {
  const text = req.body.text;
  const username = req.body.user_name;
  const matches = cleanMatches(getMatches(text));
  const linkify = strUtils.linkifySlackUsername;

  if (!shouldRespond(username, matches)) {
    return gutiBot.respondOk(res);
  }

  const blankEr = matches
    .map(splitByEr)
    .map(formatSplitWordParts)
    .join(" ");

  const message = `${linkify(username)}: ${blankEr}?! I barely know 'er!`;

  return gutiBot.respondWith(res, message);
}

module.exports = {
  getMatches,
  bot,
};
