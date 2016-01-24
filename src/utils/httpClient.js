"use strict";

const axios = require('axios');
const superagent = require('superagent');

function post(url, payload) {
  // TODO: switch this to superagent...?
  return axios.post(url, payload);
}

function _wrapSuperAgentInPromise(request) {
  return new Promise((resolve, reject) => {
    request.end((error, response) => {
      if (error || !response.ok) {
        reject(error, response);
      } else {
        resolve(response);
      }
    });
  });
}

function postForm(url, payload) {
  const request = superagent
    .post(url)
    .type('form')
    .send(payload);

  return _wrapSuperAgentInPromise(request);
}

module.exports = {
  post,
  postForm,
};
