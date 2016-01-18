"use strict";

require('../testHelper');
const barelyBot = require('../../src/barelyBot');

describe("getMatches", () => {
  it("finds matches", () => {
    const getMatches = barelyBot.getMatches;
    const erWord = "cheeseburger";
    const expected = [erWord];
    const actual = getMatches(erWord);

    expect(actual).toEqual(expected);
  });
});

// TODO: add more...
