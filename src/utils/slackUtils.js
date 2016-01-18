"use strict";

function _getBody(request) {
  return request.body;
}

const incomingWebhook = {
};

const outgoingWebhook = {
  getBody: _getBody,
  getToken(request) {
    return _getBody(request).token;
  },
  getTeamId(request) {
    return _getBody(request).team_id;
  },
  getTeamDomain(request) {
    return _getBody(request).team_domain;
  },
  getChannelId(request) {
    return _getBody(request).channel_id;
  },
  getChannelName(request) {
    return _getBody(request).channel_name;
  },
  getTimestamp(request) {
    return _getBody(request).timestamp;
  },
  getUserId(request) {
    return _getBody(request).user_id;
  },
  getUsername(request) {
    return _getBody(request).user_name;
  },
  getText(request) {
    return _getBody(request).text;
  },
  getTriggerWord(request) {
    return _getBody(request).trigger_word;
  },
  createResponse(message) {
    return {
      text: message,
    };
  },
};

module.exports = {
  incomingWebhook,
  outgoingWebhook,
};
