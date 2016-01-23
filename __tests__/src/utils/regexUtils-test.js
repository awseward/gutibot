"use strict";

require('../../testHelper');
const regexUtils = require('../../../src/utils/regexUtils');

describe('regexUtils', () => {
  describe('matchWholeWord', () => {
    const matchWholeWord = regexUtils.matchWholeWord;

    it('returns truthy on success', () => {
      const str = 'This is a contrived example.';
      const word = 'This';
      const result = matchWholeWord(word, str);

      expect(result).toBeTruthy();
    });

    it('returns falsy on match failure', () => {
      const str = 'This is a contrived example.';
      const word = 'elephant';
      const result = matchWholeWord(word, str);

      expect(result).toBeFalsy();
    });

    it('allows whitespace in front of the word', () => {
      const str = 'This is a contrived example.';
      const word = 'contrived';
      const result = matchWholeWord(word, str);

      expect(result).toBeTruthy();
    });

    it('allows punctuation at the end of the word', () => {
      const str = 'This is a contrived example.';
      const word = 'example';
      const result = matchWholeWord(word, str);

      expect(result).toBeTruthy();
    });

    it('does not match for part of a word', () => {
      const str = 'This is a contrived example.';
      const word = 'amp';
      const result = matchWholeWord(word, str);

      expect(result).toBeFalsy();
    });
  });
});
