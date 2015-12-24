"use strict";
const strUtils = require('./stringUtils');
let currentFlippyId = '';

function setFlippy() {
  // obviously wrong, need to figure out how I am going to track a day
  itHasBeenADay = true;

  if(itHasBeenADay) {
    currentFlippy = getRandomUserId();
  }
  return currentFlippy;
}

function getRandomUserId() {
  // hopefully we have access to users.list here
  // https://api.slack.com/methods/users.list
  // Apparently this is a list of user objects so the below won't work
  // this should return a random user from a slack team
  return users.list[Math.floor(Math.random() * users.list.length)].id;
}

function isFlippy(username) {
  return username === currentFlippy;
}

function bot(req, res) {
  const username = req.body.user_id;
  const timeStamp = req.body.message_timestamp;

  setFlippy();
  if (!isFlippy(username)) {
    return res.status(200).end();
  }
  // at this point, if the user isn't the flippy, nothing should happen
  // if there is a bug, then every message should have a flippy

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
