"use strict";

import barelyBot, { getMatches } from '../../src/barelyBot';

describe('barelyBot', () => {
  describe("getMatches", () => {
    it("finds matches", () => {
      const erWord = "cheeseburger";
      const expected = [erWord];
      const actual = getMatches(erWord);

      expect(actual).toEqual(expected);
    });
  });

  // TODO: add more...
});

