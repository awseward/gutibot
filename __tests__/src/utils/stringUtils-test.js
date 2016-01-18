"use strict";

require('../../testHelper');
const stringUtils = require('../../../src/utils/stringUtils.js');

describe('stringUtils', () => {
  describe("splitWord", () => {
    const splitWord = stringUtils.splitWord;

    it("splits the word by 'er'", () => {
      const word = 'boer';
      const expected = ['bo', 'er'];
      const actual = splitWord(word, 'er');

      expect(actual).toEqual(expected);
    });

    it("is always picks the last 'er'", () => {
      const word = 'blunderer';
      const expected = ['blunder', 'er'];
      const actual = splitWord(word, 'er');

      expect(actual).toEqual(expected);
    });

    it('returns ["", "er"] given an empty string', () => {
      const word = '';
      const expected = ['', 'er'];
      const actual = splitWord(word, 'er');

      expect(actual).toEqual(expected);
    });

    it('returns ["", "er"] given null', () => {
      const word = null;
      const expected = ['', 'er'];
      const actual = splitWord(word, 'er');

      expect(actual).toEqual(expected);
    });

    it('returns ["", "er"] given undefined', () => {
      const word = undefined;
      const expected = ['', 'er'];
      const actual = splitWord(word, 'er');

      expect(actual).toEqual(expected);
    });
  });

  describe('capitalizeFirstCharacter', () => {
    const capFirst = stringUtils.capitalizeFirstCharacter;

    it('capitalizes the first character of a string', () => {
      const str = 'hello';
      const expected = 'Hello';
      const actual = capFirst(str);

      expect(actual).toEqual(expected);
    });

    it('returns the empty string given an empty string', () => {
      const str = '';
      const expected = '';
      const actual = capFirst(str);

      expect(actual).toEqual(expected);
    });

    it('returns the empty string given null', () => {
      const str = null;
      const expected = '';
      const actual = capFirst(str);

      expect(actual).toEqual(expected);
    });

    it('returns the empty string given undefined', () => {
      const str = undefined;
      const expected = '';
      const actual = capFirst(str);

      expect(actual).toEqual(expected);
    });
  });

  describe('linkifySlackUsername', () => {
    const linkify = stringUtils.linkifySlackUsername;

    it('formats usernames for Slack linkification', () => {
      const username = 'somePerson';
      const expected = '<@somePerson|somePerson>';
      const actual = linkify(username);

      expect(actual).toEqual(expected);
    });

    it('simply prepends "@" for usernames with periods', () => {
      const username = 'some.person';
      const expected = '@some.person';
      const actual = linkify(username);

      expect(actual).toEqual(expected);
    });

    it('returns "@nobody" given null', () => {
      const username = null;
      const expected = '@nobody';
      const actual = linkify(username);

      expect(actual).toEqual(expected);
    });

    it('returns "@nobody" given undefined', () => {
      const username = undefined;
      const expected = '@nobody';
      const actual = linkify(username);

      expect(actual).toEqual(expected);
    });

    it('returns "@nobody" given the empty string', () => {
      const username = '';
      const expected = '@nobody';
      const actual = linkify(username);

      expect(actual).toEqual(expected);
    });
  });
});
