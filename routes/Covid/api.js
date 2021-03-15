const axios = require('axios');
require('dotenv').config();

//-----news
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

const GetNewsData = axios
    .request(options)
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        return error;
    });
// <----- news

// ---- Global Data
const GetGlobalData = axios.create({
    baseURL: process.env.RAPID_GLOBAL_DATA_URL,
    method: 'GET',
    headers: {
        'x-rapidapi-key': process.env.RAPID_GLOBAL_DATA_KEY,
        'x-rapidapi-host': process.env.RAPID_GLOBAL_HOST_URL,
        useQueryString: true,
    },
});
const Global = async function (route) {
    await GetGlobalData(`./${route}`)
        .then((res) => console.log(JSON.stringify(res.data)))
        .catch((err) => console.log(err));
};
Global('uk');
// <--- Global Data
module.exports = GetNewsData;
module.exports = GetGlobalData;
