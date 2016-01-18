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

function linkifySlackUsername(username) {
  // FIXME: Not quite sure what to do here...
  if (!username) { return '@nobody'; }

  if (username.indexOf(".") !== -1) {
    return `@${username}`;
  } else {
    return `<@${username}|${username}>`;
  }
}

module.exports = {
  capitalizeFirstCharacter,
  linkifySlackUsername,
  splitWord,
};
