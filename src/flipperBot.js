"use strict";
const strUtils = require('./stringUtils');
let currentFlipperId = '';

function getSlackToken() {
  return process.env.SLACK_API_TOKEN || 'SLACK_API_TOKEN not set';
}

function setFlipper() {
  // obviously wrong, need to figure out how I am going to track a day
  const itHasBeenADay = true;

  if(itHasBeenADay) {
    currentFlipper = getRandomUserId();
  }
  return currentFlipper;
}

function getRandomUserId() {
  // hopefully we have access to users.list here
  // https://api.slack.com/methods/users.list
  // Apparently this is a list of user objects so the below won't work
  // this should return a random user from a slack team
  return users.list[Math.floor(Math.random() * users.list.length)].id;
}

function isFlipper(username) {
  return username === currentFlipper;
}

function bot(req, res) {
  const username = req.body.user_id;
  const timeStamp = req.body.message_timestamp;

  setFlipper();
  if (!isFlipper(username)) {
    return res.status(200).end();
  }
  // at this point, if the user isn't the flipper, nothing should happen
  // if there is a bug, then every message should have a flipper

  // set flipper to the appropriate msg payload
  const payload = {
    name: flipper,
    timestamp: timeStamp,
  };

  return res.status(200).json(payload);
}

module.exports = {
  bot,
};
