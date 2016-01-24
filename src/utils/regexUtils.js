"use strict";

function matchWholeWord(word, str) {
  const pattern = `(^|\\s)${word}(\\W|$)`;

  return (str || '').match(new RegExp(pattern, 'i'));
}

export {
  matchWholeWord,
};
