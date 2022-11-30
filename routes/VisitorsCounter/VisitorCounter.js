const Visitor = require('./models/visitors.model');
const router = require('express').Router();
const email = require('./visitors_email');
const mongoose = require('mongoose');
const sendEmail = email.sendEmail;
require('dotenv').config();

const VISITORS_URI = process.env.VISITORS_URI;

// mongoose.connect(VISITORS_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log('MongoDB database connection established successfully!!');
// });
// // <- mongoose

router.route('/').get((req, res) => {
    Visitor.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(400).json('Error:' + err));
});

router.route('/recordVisit').post((req, res) => {
    let date = req.body.date;
    let time = req.body.time;
    let counter;

    Visitor.find().then((users) => {
        let lastVisit = users[users.length - 1].counter;
        counter = lastVisit + 1;
        const newVisitor = new Visitor({
            counter,
        });
        newVisitor
            .save()
            .then(() => res.json(`Entry recorded`))
            .catch((err) => res.status(400).json(`Error is ${err}`));
        sendEmail(time, date, counter);
    });
});

router.route('/delete').delete((req, res) => {
    Visitor.remove({ counter: 0 }).then((duplicates) => {
        console.log(duplicates);
        res.json('Deleted Duplicated entries');
    });
});

module.exports = router;
