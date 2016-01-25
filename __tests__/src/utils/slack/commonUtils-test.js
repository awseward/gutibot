'use strict';

import {
  linkifyUsername as linkify,
} from '../../../../src/utils/slack/commonUtils';

describe('slack commonUtils', () => {
  describe('linkifyUsername', () => {
    it('formats usernames for Slack linkification', () => {
      const username = 'somePerson';
      const expected = '<@somePerson|somePerson>';
      const actual = linkify(username);

      expect(actual).toEqual(expected);
    });

    it(`simply prepends '@' for usernames with periods`, () => {
      const username = 'some.person';
      const expected = '@some.person';
      const actual = linkify(username);

      expect(actual).toEqual(expected);
    });

    it('returns @nobody given null', () => {
      const username = null;
      const expected = '@nobody';
      const actual = linkify(username);

      expect(actual).toEqual(expected);
    });

    it('returns @nobody given undefined', () => {
      const username = undefined;
      const expected = '@nobody';
      const actual = linkify(username);

      expect(actual).toEqual(expected);
    });

    it('returns @nobody given the empty string', () => {
      const username = '';
      const expected = '@nobody';
      const actual = linkify(username);

      expect(actual).toEqual(expected);
    });
  });
});
