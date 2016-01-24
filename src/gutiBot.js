"use strict";

const slackOut = require('./utils/slackUtils').outgoingWebhook;
const slackIn = require('./utils/slackUtils').incomingWebhook;
const httpClient = require('./utils/httpClient');

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
  return slackOut.getUsername(request) === 'slackbot';
}

function _respondOk(response) {
  return _ok(response).end();
}

function _respondOkWithMessage(response, message) {
  const payload = slackOut.createResponse(message);

  return _ok(response).json(payload);
}

function respondViaWebhook(hookUrl, destination, message) {
  const payload = slackIn.createMessagePayload(destination, message);

  return httpClient.post(hookUrl, payload);
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
    return _respondOk(response);
  };
}

function doAsyncWithMessage(botFn, message) {
  return (request, response) => {
    if (_requestIsFromSlackbot(request)) { return _respondOk(response); }

    botFn(request);
    return _respondOkWithMessage(response, message);
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
