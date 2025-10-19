const VisitorRoute = require('./routes/VisitorsCounter/VisitorCounter.js');
const ContactFormRoute = require('./routes/ContactForm/ContactForm.js');
const Register = require('./routes/RegisterLogin/Register.js')
const Tictactoe = require('./routes/Tictactoe/Tictactoe.js');
const ChatBot = require('./routes/ChatBot/ChatBot.js');
const Covid = require('./routes/Covid/Covid.js');
const Tracker = require('./routes/WorkTracker/Tracker.js');
const express = require('express');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// routes
app.get('/', (req, res) => {
    res.send('Hi there, this is base URL');
});

// app.use('/covid', Covid);
// app.use('/chatBot', ChatBot);
// app.use('/register', Register)
// app.use('/tictactoe', Tictactoe);
// app.use('/visitor', VisitorRoute);
// app.use('/contactForm', ContactFormRoute);
app.use('/workTracker', Tracker);

// Export the Express app for Vercel
module.exports = app;

// For local development
if (process.env.NODE_ENV !== 'production') {
    const Port = process.env.PORT || 8080;
    app.listen(Port, () => {
        console.log(`Example app listening at http://localhost:${Port}`);
    });
}
