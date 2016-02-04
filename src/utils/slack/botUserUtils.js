'use strict';

import { postForm as post } from '../httpClient';
import { getSlackBotUserApiToken } from '../envUtils';

const baseUrl = 'https://api.slack.com/api';
const token = getSlackBotUserApiToken();

function _getBotUsername() {
  return 'gutibot'; // TODO: Un-hardcode
}

function _getUrl(method) {
  return `${baseUrl}/${method}`;
}

function _getParams(params) {
  const baseParams = {
    token,
    username: _getBotUsername(),
  };

  return Object.assign({}, baseParams, params);
}

function _listUsers() {
  const url = `${baseUrl}/users.list`;
  const params = _getParams();

  return post(url, _getParams());
}

function _openIM(userId) {
  const url = `${baseUrl}/im.open`;
  const params = _getParams({
    user: userId
  });

  return post(url, params);
}

function _addReaction(reactionName, channel, timestamp) {
  const url = `${baseUrl}/reactions.add`;
  const params = _getParams({
    name: reactionName,
    channel,
    timestamp,
  });

  return post(url, params);
}

function _sendMessage(destination, message) {
  const url = `${baseUrl}/chat.postMessage`;
  const params = _getParams({
    channel: destination,
    text: message,
  });

  return post(url, params);
}

function _listChannels() {
  const url = _getUrl('channels.list');
  const params = _getParams({
    exclude_archived: 1,
  });

  return post(url, params);
}

function _getUserByUsername(username) {
  return _listUsers()
    .then(resp => resp.body.members.filter(u => u.name === username)[0]);
}

function _getUserId(username) {
  return _getUserByUsername(username)
    .then(user => user && user.id);
}

export default function sendDirectMessage(username, message) {
  // FIXME
  return _getUserId(username)
    .then(_openIM)
    .then(resp => _sendMessage(resp.body.channel.id, message))
}
