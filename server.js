const VisitorRoute = require('./routes/VisitorsCounter/VisitorCounter.js');
const ContactFormRoute = require('./routes/ContactForm/ContactForm.js');
const Tictactoe = require('./routes/Tictactoe/Tictactoe.js');
const ChatBot = require('./routes/ChatBot/ChatBot.js');
const Covid = require('./routes/Covid/Covid.js');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());

const Port = process.env.PORT || 8080;

// routes
app.get('/', (req, res) => {
    res.send('Hi there, this is base URL, cheers');
});
app.use('/covid', Covid);
app.use('/chatBot', ChatBot);
app.use('/visitor', VisitorRoute);
app.use('/tictactoe', Tictactoe);
app.use('/contactForm', ContactFormRoute);

app.listen(Port, () => {
    console.log(`Example app listening at http://localhost:${Port}`);
});
