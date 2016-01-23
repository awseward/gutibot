"use strict";

function splitWord(word, suffix) {
  if (!word) { return ['', suffix]; }

  const indexOfSuffix = word.lastIndexOf(suffix);
  const prefix = word.slice(0, indexOfSuffix);

  return [prefix, suffix];
}

function capitalizeFirstCharacter(str) {
  if (!str) { return ''; }

  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = {
  capitalizeFirstCharacter,
  splitWord,

  // DEPRECATED
  linkifySlackUsername: require('./slackUtils').common.linkifyUsername,
};
