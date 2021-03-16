const router = require('express').Router();
let axios = require('axios').default;

var options = {
    method: 'GET',
    url: 'https://newscatcher.p.rapidapi.com/v1/search',
    params: {
        q: 'covid',
        lang: 'en',
        sort_by: 'relevancy',
        country: 'gb',
        page: '1',
        media: 'True',
    },
    headers: {
        'x-rapidapi-key': '2f627d12d3mshefe5a3aab02c970p145cc9jsn6ebc2c4b3cff',
        'x-rapidapi-host': 'newscatcher.p.rapidapi.com',
    },
};

axios
    .request(options)
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.error(error);
    });

router.route('/').get((req, res) => {
    // console.log(news);
    res.send('News');
});

module.exports = router;
