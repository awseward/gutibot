"use strict";

const slack = require('./utils/slackUtils');
const axios = require('axios');

function _ok(response) {
  return response.status(200);
}

function _getIncomingWebhookUrl() {
  return process.env.SLACK_INCOMING_WEBHOOK_URL;
}

function _getBotUserApiToken() {
  return process.env.SLACK_BOT_USER_API_TOKEN;
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

function respondViaDefaultWebhook(channel, message) {
  const hookUrl = _getIncomingWebhookUrl();

  return respondViaWebhook(hookUrl, channel, message);
}

module.exports = {
  respondOk,
  respondWith,
  respondViaWebhook,
  respondViaDefaultWebhook,
};
