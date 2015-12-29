"use strict";

const strUtils = require('./stringUtils');
const axios = require('axios');

function getSlackToken() {
  return process.env.SLACK_API_TOKEN || 'SLACK_API_TOKEN not set';
}

function getUserId(message) {
  return message.user_id;
}

function getFlipperId() {
  // TODO: Un-hardcode this.
  return 'U03SS4H49';
}

function messageIsFromFlipper(message, flipperId) {
  return getUserId(message) === flipperId;
}

function getUsers() {
  const url = 'https://slack.com/api/users.list';
  const token = getSlackToken();
  const params = { params: { token } };

  return axios.get(url, params);
}

function bot(req, res) {
  const message = req.body;
  const flipperId = getFlipperId();

  if (!messageIsFromFlipper(message, flipperId)) { return res.status(200); }

  getUsers()
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

  return res.status(200).end();
}

module.exports = {
  bot,
};
