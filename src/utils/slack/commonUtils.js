"use strict";

module.exports = {
  linkifyUsername(username) {
    // FIXME: Not quite sure what to do here...
    if (!username) { return '@nobody'; }

    if (username.indexOf(".") !== -1) {
      return `@${username}`;
    } else {
      return `<@${username}|${username}>`;
    }
  },
};
