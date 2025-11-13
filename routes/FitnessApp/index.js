const express = require('express');
const router = express.Router();
const exercisesRouter = require('./routes/exercises');
const userRouter = require('./routes/users');
const mongoose = require('mongoose');

require('dotenv').config();
const URI = process.env.FITNESS_APP_URI;

// MongoDB connection
if (URI) {
    console.log("Attempting to connect to MongoDB...");
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true
    })
        .then(() => {
            console.log("MongoDB database connection established successfully for FitnessApp");
        })
        .catch(err => {
            console.error("MongoDB connection error:", err.message);
            console.error("Please check your FITNESS_APP_URI in .env file");
        });
} else {
    console.warn("FITNESS_APP_URI not found in environment variables");
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