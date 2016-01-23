"use strict";

module.exports = {
  createMessagePayload(destination, message) {
    return {
      channel: destination,
      text: message,
    };
  },
};
