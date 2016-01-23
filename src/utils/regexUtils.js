"use strict";

module.exports = {
  matchWholeWord(word, str) {
    const pattern = `(^|\\s)${word}(\\W|$)`;

    return (str || '').match(new RegExp(pattern, 'i'));
  }
};
