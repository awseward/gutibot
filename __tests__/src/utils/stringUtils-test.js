'use strict';

import stringUtils from '../../../src/utils/stringUtils';

describe('stringUtils', () => {
  describe('splitWord', () => {
    const splitWord = stringUtils.splitWord;

    it(`splits the word by 'er'`, () => {
      const word = 'boer';
      const expected = ['bo', 'er'];
      const actual = splitWord(word, 'er');

      expect(actual).toEqual(expected);
    });

    it(`is always picks the last 'er'`, () => {
      const word = 'blunderer';
      const expected = ['blunder', 'er'];
      const actual = splitWord(word, 'er');

      expect(actual).toEqual(expected);
    });

    it(`returns ['', 'er'] given an empty string`, () => {
      const word = '';
      const expected = ['', 'er'];
      const actual = splitWord(word, 'er');

      expect(actual).toEqual(expected);
    });

    it(`returns ['', 'er'] given null`, () => {
      const word = null;
      const expected = ['', 'er'];
      const actual = splitWord(word, 'er');

      expect(actual).toEqual(expected);
    });

    it(`returns ['', 'er'] given undefined`, () => {
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
});
