"use strict";

const slack = require('./utils/slackUtils');
const axios = require('axios');

function _ok(response) {
  return response.status(200);
}

function respondOk(response) {
  return _ok(response).end();
}

function respondWith(response, message) {
  const payload = slack.outgoingWebhook.createResponse(message);

  return _ok(response).json(payload);
}

function respondViaWebhook(hookUrl, channel, message) {
  return axios.post(hookUrl, {
    channel,
    text: message,
  });
}

module.exports = {
  respondOk,
  respondWith,
  respondViaWebhook,
};
