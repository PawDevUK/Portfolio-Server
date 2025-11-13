const VisitorRoute = require('./routes/VisitorsCounter/VisitorCounter.js');
const ContactFormRoute = require('./routes/ContactForm/ContactForm.js');
const Register = require('./routes/RegisterLogin/Register.js')
const Tictactoe = require('./routes/Tictactoe/Tictactoe.js');
const ChatBot = require('./routes/ChatBot/ChatBot.js');
const Covid = require('./routes/Covid/Covid.js');
const Tracker = require('./routes/WorkTracker/Tracker.js');
const Timeline = require('./routes/Timeline/Timeline.js');
const fitnessAppRoute = require('./routes/FitnessApp');

const express = require('express');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const app = express();
app.use(express.json());

const corsOptions = {
    origin: ['https://pawelsiwek.co.uk', 'https://portfolio-react-f0jbhhayo-pawdevs-projects-c1e9b938.vercel.app'], // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true // Allow cookies and credentials
};

app.use(cors(corsOptions));

// Error handling for malformed JSON
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ error: 'Invalid JSON format in request body' });
    }
    next();
});

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
app.use('/fitnessapp', fitnessAppRoute);

// Export the Express app for Vercel
module.exports = app;

// For local development
if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'production') {
    const Port = process.env.PORT || 8080;
    app.listen(Port, () => {
        console.log(`Example app listening at http://localhost:${Port}`);
    });
}
