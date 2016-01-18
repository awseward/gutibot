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

function respondViaWebhook(hookUrl, destination, message) {
  // TODO: Building this payload should probably be moved to slackUtils...
  return axios.post(hookUrl, {
    channel: destination,
    text: message,
  });
}

function respondViaDefaultWebhook(destination, message) {
  const hookUrl = _getIncomingWebhookUrl();

  return respondViaWebhook(hookUrl, destination, message);
}

module.exports = {
  respondOk,
  respondWith,
  respondViaWebhook,
  respondViaDefaultWebhook,
};
