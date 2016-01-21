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

function _requestIsFromSlackbot(request) {
  return slack.outgoingWebhook.getUsername(request) === 'slackbot';
}

function _respondOk(response) {
  return _ok(response).end();
}

function _respondOkWithMessage(response, message) {
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

function doSync(botFn) {
  return (request, response) => {
    if (_requestIsFromSlackbot(request)) { return _respondOk(response); }

    return botFn(
      request,
      () => _respondOk(response),
      message => _respondOkWithMessage(response, message)
    );
  };
}

// NOTE: Neither of the following `doAsync` functions has been tested, so should
// be considered suspect for the time-being

function doAsync(botFn) {
  return (request, response) => {
    if (_requestIsFromSlackbot(request)) { return _respondOk(response); }

    botFn(request);
    return respondOk(response);
  };
}

function doAsyncWithMessage(botFn, message) {
  return (request, response) => {
    if (_requestIsFromSlackbot(request)) { return _respondOk(response); }

    botFn(request);
    return respondWith(response, message);
  };
}

// ============================================================================

module.exports = {
  doAsync,
  doAsyncWithMessage,
  respondViaWebhook,
  respondViaDefaultWebhook,
  doSync,
};
