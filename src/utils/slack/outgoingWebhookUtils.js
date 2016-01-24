"use strict";

function getBody(request) {
  return request.body;
}

module.exports = {
  getBody,
  getToken(request) {
    return getBody(request).token;
  },
  getTeamId(request) {
    return getBody(request).team_id;
  },
  getTeamDomain(request) {
    return getBody(request).team_domain;
  },
  getChannelId(request) {
    return getBody(request).channel_id;
  },
  getChannelName(request) {
    return getBody(request).channel_name;
  },
  getTimestamp(request) {
    return getBody(request).timestamp;
  },
  getUserId(request) {
    return getBody(request).user_id;
  },
  getUsername(request) {
    return getBody(request).user_name;
  },
  getText(request) {
    return getBody(request).text;
  },
  getTriggerWord(request) {
    return getBody(request).trigger_word;
  },
  createResponse(message) {
    return {
      text: message,
    };
  },
};
