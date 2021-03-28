const mongodb = require('mongodb');

VISITORS_URI = null;

const getVisitors = async (req, res) => {
    const method = req.method;
    if (method === 'GET') {
        const client = await mongodb.MongoClient.connect(VISITORS_URI);
        const visits = await client.db('Portfolio').collection('visitors').find().toArray();
        const { counter } = visits[visits.length - 1];
        res.send({ counter });
    }
    return;
};

exports.getVisitors = getVisitors;
