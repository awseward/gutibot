"use strict";

function createMessagePayload(destination, message) {
  return {
    channel: destination,
    text: message,
  };
}

export {
  createMessagePayload,
};
