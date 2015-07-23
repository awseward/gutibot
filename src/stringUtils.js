(function() {
  "use strict";

  /**
   * @param {string} word - The word to split
   * @param {string} suffix - The suffix to split on
   */
  function splitWord(word, suffix) {
    var indexOfSuffix = word.lastIndexOf(suffix);
    var prefix = word.slice(0, indexOfSuffix);

    return [prefix, suffix];
  }

  module.exports = {
    splitWord: splitWord,
  };
})();
