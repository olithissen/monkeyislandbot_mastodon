'use strict';

const https = require('https');
const request = require('request');
const logger = require('de-loggingsystem');
const OAuth2 = require('oauth').OAuth2;
const twit = require('twit');
const quotes = require('./data/quotes');

module.exports.mibot = async event => {

  let config = {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
  }

  const Twitter = new twit(config);

  const response = await new Promise((resolve, reject) => {
    let quote = quotes.getRandomQuote();
    let tweet = `${quote} #monkeyisland`;
    logger.log(logger.LogLevel.info, `Trying to tweet "${tweet}"`);
    Twitter.post('statuses/update', { status: tweet }, function (err, data, response) {
      if (err) {
        logger.log(logger.LogLevel.error, `Tweet was not posted. Errorcode: ${err}`, logger.ErrorCode.Error);
      } else {
        logger.log(logger.LogLevel.info, `Tweet posted`);
      }
    });
  });

  return response;
};
