"use strict";

function _ok(response) {
  return response.status(200);
}

function respondOk(response) {
  return _ok(response).end();
}

function respondWith(response, message) {
  return _ok(response).json({
    text: message,
  });
}

function respondViaWebhook(hookUrl, channel, message) {
  // NOTE: This require is temporary until
  // axios plays well with jest
  return require("axios").post(hookUrl, {
    channel,
    text: message,
  });
}

module.exports = {
  respondOk,
  respondWith,
  respondViaWebhook,
};
