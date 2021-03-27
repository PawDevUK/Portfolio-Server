const Visitor = require('./models/visitors.model');
const mongoose = require('mongoose');
require('dotenv').config();

const getVisitors = (req, res) => {
    const method = req.method;
    try {
        if (method === 'GET') {
        }
    } catch (error) {
        console.log(error);
    }
};

exports.getVisitors = getVisitors;
