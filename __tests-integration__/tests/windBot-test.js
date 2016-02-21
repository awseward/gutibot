import { describe, it } from 'mocha';
import { expect } from 'chai';

const dist = '../../dist';
const post = require(`${dist}/utils/httpClient`).postForm;
const port = process.env.PORT || 3000;
const baseUrl = `http://localhost:${port}`;

function _getSampleRequest() {
  return require('../data/outgoingWebhookRequest.json');
}

function _postMessageToBot(message) {
  const url = `${baseUrl}/wind`;
  const body = Object.assign(_getSampleRequest(), {
    text: message,
  });

  return post(url, body);
}

describe('windBot', () => {
  describe('responds to messages containing certain words', () => {
    const inputs = [
      'wind',
      'Wind',
      'wInd',
      'My favorite kind of weather pattern is wind.',
      'I like wind, rain, and snow',
    ];

    function _expectResponse(input) {
      it(input, () => {
        return expect(_postMessageToBot(input))
          .to
          .eventually
          .satisfy(resp => resp.text && resp.text !== '');
      });
    }

    inputs.forEach(_expectResponse);
  });

  describe(`doesn't respond when those words aren't present`, () => {
    const inputs = [
      null,
      undefined,
      '',
      'The window is open',
      'Things are finally winding down',
    ];

    function _expectNoResponse(input) {
      it(input, () => {
        return expect(_postMessageToBot(input))
          .to
          .eventually
          .satisfy(resp => !resp.text && resp.text === '');
      });
    }

    inputs.forEach(_expectNoResponse);
  });
});
