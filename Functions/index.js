const Visitor = require('../routes/VisitorsCounter/models/visitors.model');
const mongoose = require('mongoose');
require('dotenv').config();

const VISITORS_URI = process.env.VISITORS_URI;

const getVisitors = async (req, res) => {
    const method = req.method;

    if (method === 'GET') {
        mongoose.connect(VISITORS_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const connection = mongoose.connection;

        connection.once('open', () => {
            console.log('MongoDB database connection established successfully!!');
        });

        await Visitor.find().then((counter) => {
            res.send(counter);
        });
        return;
    }
    return;
};

exports.getVisitors = getVisitors;
