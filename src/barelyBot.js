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

function _isDictionaryWord(word) {
  // TODO: Actually implement
  return new Promise((resolve, reject) => {
    resolve({
      word,
      isDictionary: _isTwentyFivePercentChance(),
    });
  });
}

function _isSlackbot(username) {
  return username === 'slackbot';
}

// TODO: (Rename / break up) this function
function _performDictionaryLookupsAndMaybePostBack(request, matches) {
  const channelName = slack.outgoingWebhook.getChannelName(request);

  return Promise.all(matches.map(_isDictionaryWord))
    .then(results => {
      const dictionary = results
        .filter(res => res.isDictionary)
        .map(res => res.word);

      const notDictionary = results
        .filter(res => !res.isDictionary)
        .map(res => res.word);

      const sendMessage = gutiBot.respondViaWebhook.bind(
        null,
        "https://hooks.slack.com/services/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",
        `#${channelName}`
      );

      sendMessage('Dictionary: ' + dictionary.join(', '));

      sendMessage('Not dictionary: ' + notDictionary.join(', '));
    });
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
