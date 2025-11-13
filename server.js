const VisitorRoute = require('./routes/VisitorsCounter/VisitorCounter.js');
const ContactFormRoute = require('./routes/ContactForm/ContactForm.js');
const Register = require('./routes/RegisterLogin/Register.js')
const Tictactoe = require('./routes/Tictactoe/Tictactoe.js');
const ChatBot = require('./routes/ChatBot/ChatBot.js');
const Covid = require('./routes/Covid/Covid.js');
const Tracker = require('./routes/WorkTracker/Tracker.js');
const Timeline = require('./routes/Timeline/Timeline.js');
const exercisesRouter = require('./routes/FitnessApp/routes/exercises');
const userRouter = require('./routes/FitnessApp/routes/users');
const express = require('express');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'https://portfolio-server-104qu2sac-pawdevs-projects-c1e9b938.vercel.app'],
    credentials: true
}));

// routes
app.get('/', (req, res) => {
    res.send('Hi there, this is base URL');
});

app.use('/covid', Covid);
app.use('/chatBot', ChatBot);
app.use('/register', Register)
app.use('/tictactoe', Tictactoe);
app.use('/visitor', VisitorRoute);
app.use('/contactForm', ContactFormRoute);
app.use('/workTracker', Tracker);
app.use('/timeline', Timeline);
app.use('/fitnessapp/exercises', exercisesRouter);
app.use('/fitnessapp/users', userRouter);

// Export the Express app for Vercel
module.exports = app;

// For local development
if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'production') {
    const Port = process.env.PORT || 8080;
    app.listen(Port, () => {
        console.log(`Example app listening at http://localhost:${Port}`);
    });
}
