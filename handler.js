'use strict';

const axios = require('axios');
const quotes = require('./data/quotes_de');

module.exports.mibot = async event => {

    let cfg = {
        access_token: process.env.ACCESS_TOKEN,
        api_url: process.env.API_URL
    }

    const response = await new Promise((resolve, reject) => {
        let quote = quotes.getRandomQuote();
        let status_message = `${quote}`;
        console.log(`Trying to tweet "${status_message}"`);
        var config = {
            method: 'post',
            url: `${cfg.api_url}/statuses`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cfg.access_token}`
            },
            data: JSON.stringify({status: status_message, language: 'de'})
        };

        axios(config)
            .then(function (res) {
                console.log(JSON.stringify(res.data));
                resolve(res.statusCode);
            })
            .catch(function (error) {
                console.log(error);
                reject(Error(error));
            });
    });

    return response;
};
