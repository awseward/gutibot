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
  const url = `${baseUrl}/neckAndBack`;
  const body = Object.assign(_getSampleRequest(), {
    text: message,
  });

  return post(url, body);
}

describe('neckAndBackBot', () => {
  describe('responds to messages containing certain words', () => {
    const inputs = [
      'Break ya neck!',
      'Back in my day...',
    ];

    function _expectResponse(input) {
      it(input, () => {
        const promise = _postMessageToBot(input);

        return expect(promise)
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
      'Sweet backpack!',
      'I like your necktie',
    ];

    function _expectNoResponse(input) {
      it(input, () => {
        const promise = _postMessageToBot(input);

        return expect(promise)
          .to
          .eventually
          .satisfy(resp => !resp.text || resp.text === '');
      });
    }

    inputs.forEach(_expectNoResponse);
  });
});
