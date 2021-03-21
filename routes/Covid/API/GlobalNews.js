const axios = require('axios');
require('dotenv').config();

//-----news
const options = {
    method: 'GET',
    url: process.env.RAPID_NEWS_URL,
    params: {
        q: 'Covid',
        lang: 'en',
        sort_by: 'relevancy',
        from: '2020/03/01',
        search_in: 'title',
        country: 'UK',
        page: '1',
        media: 'True',
    },
    headers: {
        'x-rapidapi-key': process.env.RAPID_NEWS_KEY,
        'x-rapidapi-host': 'newscatcher.p.rapidapi.com',
    },
};

const GetNewsData = () => {
    return axios
        .request(options)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return error;
        });
};

// <----- news

module.exports = GetNewsData;
