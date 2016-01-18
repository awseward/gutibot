"use strict";

const srcPath = "../../../src/utils/slackUtils";
jest.dontMock(srcPath);

describe('slackUtils', () => {
  describe('outgoingWebhook', () => {
    const outgoing = require(srcPath).outgoingWebhook;

    // TODO
    xdescribe('request parsing');
    xdescribe('response creation');
  });
});
