const axios = require('axios');
require('dotenv').config();

const options = {
    method: 'GET',
    url: process.env.RAPID_NEWS_URL,
    params: {
        q: 'Covid-19',
        lang: 'en',
        sort_by: 'relevancy',
        from: '2021/03/01',
        to: '2021/03/13',
        country: 'UK',
        media: 'True',
    },
    headers: {
        'x-rapidapi-key': process.env.RAPID_NEWS_KEY,
        'x-rapidapi-host': 'newscatcher.p.rapidapi.com',
    },
};

const GetData = axios
    .request(options)
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        return error;
    });

module.exports = GetData;
