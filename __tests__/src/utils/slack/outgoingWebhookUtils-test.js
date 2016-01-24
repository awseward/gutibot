"use strict";

require('../../../testHelper');
const slackOut = require('../../../../src/utils/slack/outgoingWebhookUtils');

function _getRequest() {
  return {
    body: {
      token: 'asdf',
      team_id: 'asdf',
      team_domain: 'asdf',
      channel_id: 'asdf',
      channel_name: 'asdf',
      timestamp: 'asdf',
      user_id: 'asdf',
      text: 'asdf',
      trigger_ord: 'asdf',
    },
  };
}

describe('slack outgoingWebhookUtils', () => {
  describe('getBody', () => {
    it('gets the request body', () => {
      const request = _getRequest();
      const expected = request.body;
      const actual = slackOut.getBody(request);

      expect(actual).toEqual(expected);
    });
  });

  describe('getToken', () => {
    it('gets the token', () => {
      const request = _getRequest();
      const expected = request.body.token;
      const actual = slackOut.getToken(request);

      expect(actual).toEqual(expected);
    });
  });

  describe('getTeamId', () => {
    it('gets the team id', () => {
      const request = _getRequest();
      const expected = request.body.team_id;
      const actual = slackOut.getTeamId(request);

      expect(actual).toEqual(expected);
    });
  });

  describe('getTeamDomain', () => {
    it('gets the team domain', () => {
      const request = _getRequest();
      const expected = request.body.team_domain;
      const actual = slackOut.getTeamDomain(request);

      expect(actual).toEqual(expected);
    });
  });

  describe('getChannelId', () => {
    it('gets the channel id', () => {
      const request = _getRequest();
      const expected = request.body.channel_id;
      const actual = slackOut.getChannelId(request);

      expect(actual).toEqual(expected);
    });
  });

  describe('getChannelName', () => {
    it('gets the channel name', () => {
      const request = _getRequest();
      const expected = request.body.channel_name;
      const actual = slackOut.getChannelName(request);

      expect(actual).toEqual(expected);
    });
  });

  describe('getTimestamp', () => {
    it('gets the message timestamp', () => {
      const request = _getRequest();
      const expected = request.body.timestamp;
      const actual = slackOut.getTimestamp(request);

      expect(actual).toEqual(expected);
    });
  });

  describe('getUserId', () => {
    it('gets the user id', () => {
      const request = _getRequest();
      const expected = request.body.user_id;
      const actual = slackOut.getUserId(request);

      expect(actual).toEqual(expected);
    });
  });

  describe('getUsername', () => {
    it('gets the username', () => {
      const request = _getRequest();
      const expected = request.body.user_name;
      const actual = slackOut.getUsername(request);

      expect(actual).toEqual(expected);
    });
  });

  describe('getText', () => {
    it('gets the message text', () => {
      const request = _getRequest();
      const expected = request.body.text;
      const actual = slackOut.getText(request);

      expect(actual).toEqual(expected);
    });
  });

  describe('getTriggerWord', () => {
    it('gets the trigger word', () => {
      const request = _getRequest();
      const expected = request.body.trigger_word;
      const actual = slackOut.getTriggerWord(request);

      expect(actual).toEqual(expected);
    });
  });
});
