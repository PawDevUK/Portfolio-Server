const VisitorRoute = require('./routes/VisitorsCounter/VisitorCounter.js');
const ContactFormRoute = require('./routes/ContactForm/ContactForm.js');
const Tictactoe = require('./routes/Tictactoe/Tictactoe.js');
const ChatBot = require('./routes/ChatBot/ChatBot.js');
const Covid = require('./routes/Covid/Covid.js');
const express = require('express');
const cors = require('cors');
const Register = require('./routes/RegisterLogin/Register.js')

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({
    origin:'http://localhost:3000'
}));

const Port = process.env.PORT || 8080;

// routes
app.get('/', (req, res) => {
    res.send('Hi there, this is base URL');
});

app.use('/covid', Covid);
app.use('/chatBot', ChatBot);
app.use('/visitor', VisitorRoute);
app.use('/tictactoe', Tictactoe);
app.use('/contactForm', ContactFormRoute);
app.use('/register', Register)

app.listen(Port, () => {
    console.log(`Example app listening at http://localhost:${Port}`);
});
