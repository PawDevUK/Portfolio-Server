const axios = require('axios');
require('dotenv').config();

const GetGlobalData = (country) => {
    return axios
        .request({
            method: 'GET',
            url: `${process.env.RAPID_GLOBAL_DATA_URL}${country}/`,
            headers: {
                'x-rapidapi-key': process.env.RAPID_GLOBAL_DATA_KEY,
                'x-rapidapi-host': process.env.RAPID_GLOBAL_HOST_URL,
            },
        })
        .then(function (response) {
            return JSON.stringify(response.data);
        })
        .catch(function (error) {
            return error;
        });
};

module.exports = GetGlobalData;
