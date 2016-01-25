'use strict';

function getBody(request) {
  return request.body;
}

function getToken(request) {
  return getBody(request).token;
}

function getTeamId(request) {
  return getBody(request).team_id;
}

function getTeamDomain(request) {
  return getBody(request).team_domain;
}

function getChannelId(request) {
  return getBody(request).channel_id;
}

function getChannelName(request) {
  return getBody(request).channel_name;
}

function getTimestamp(request) {
  return getBody(request).timestamp;
}

function getUserId(request) {
  return getBody(request).user_id;
}

function getUsername(request) {
  return getBody(request).user_name;
}

function getText(request) {
  return getBody(request).text;
}

function getTriggerWord(request) {
  return getBody(request).trigger_word;
}

function createResponse(message) {
  return {
    text: message,
  };
}

export {
  getBody,
  getToken,
  getTeamId,
  getTeamDomain,
  getChannelId,
  getChannelName,
  getTimestamp,
  getUserId,
  getUsername,
  getText,
  getTriggerWord,
  createResponse,
};
