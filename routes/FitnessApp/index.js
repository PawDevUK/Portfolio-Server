const express = require('express');
const router = express.Router();
const exercisesRouter = require('./routes/exercises');
const userRouter = require('./routes/users');
const mongoose = require('mongoose');

require('dotenv').config();
const URI = process.env.ATLAS_URI;

// MongoDB connection
if (URI) {
    mongoose.connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).then(() => {
        console.log("MongoDB database connection established successfully for FitnessApp");
    }).catch(err => {
        console.error("MongoDB connection error:", err);
    });
}

// Root route
router.get('/', (req, res) => {
    res.json({
        message: 'FitnessApp API',
        endpoints: {
            users: '/fitnessapp/users',
            exercises: '/fitnessapp/exercises'
        }
    });
});

// Sub-routes
router.use('/exercises', exercisesRouter);
router.use('/users', userRouter);

module.exports = router;