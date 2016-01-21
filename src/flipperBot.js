"use strict";

const axios = require('axios');

// TODO
// - [ ] Persist flipper for 24hr intervals (regardless of deploys)
// - [ ] Post reactions on messages

function _getSlackToken() {
  return process.env.SLACK_API_TOKEN || 'SLACK_API_TOKEN not set';
}

function _getUserId(message) {
  return message.user_id;
}

function _getFlipperId() {
  // TODO: Un-hardcode this.
  return 'U03SS4H49';
}

function _messageIsFromFlipper(message, flipperId) {
  return _getUserId(message) === flipperId;
}

function _getUsers() {
  const url = 'https://slack.com/api/users.list';
  const token = _getSlackToken();
  const params = { params: { token } };

  return axios.get(url, params);
}

function bot(request) {
  const message = request.body;
  const flipperId = _getFlipperId();

  if (!_messageIsFromFlipper(message, flipperId)) { return res.status(200); }

  _getUsers()
    .then(resp => {
      const members = resp.data.members;
      const flipperCandidates = members.filter(user => user.id === flipperId);

      if (flipperCandidates.length === 0) {
        console.error('NO FLIPPER');
      } else if (flipperCandidates.length !== 1) {
        console.error('THERE CAN ONLY BE ONE');
      } else {
        console.log(`The flipper is ${flipperCandidates[0].real_name}!!!`);
      }
    });
}

module.exports = bot;
