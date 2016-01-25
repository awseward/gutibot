'use strict';

function getSlackIncomingWebhookUrl() {
  return process.env.SLACK_INCOMING_WEBHOOK_URL;
}

function getSlackBotUserApiToken() {
  return process.env.SLACK_BOT_USER_API_TOKEN;
}

function getWordnikApiToken() {
  return process.env.WORDNIK_API_TOKEN;
}

export {
  getSlackBotUserApiToken,
  getSlackIncomingWebhookUrl,
  getWordnikApiToken,
};
