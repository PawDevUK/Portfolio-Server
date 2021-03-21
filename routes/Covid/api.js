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

// ---- Global Data
const GetData = axios.create({
    baseURL: process.env.RAPID_GLOBAL_DATA_URL,
    method: 'GET',
    headers: {
        'x-rapidapi-key': process.env.RAPID_GLOBAL_DATA_KEY,
        'x-rapidapi-host': process.env.RAPID_GLOBAL_HOST_URL,
        useQueryString: true,
    },
});
const GetGlobalData = (route) => {
    GetData(`${route}`)
        .then((res) => res)
        .catch((err) => console.log(err));
};

// <--- Global Data

// GetGlobalData('uk');

exports.GetNewsData = GetNewsData;
exports.GetGlobalData = GetGlobalData;
