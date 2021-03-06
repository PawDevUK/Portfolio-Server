const VisitorRoute = require('./routes/VisitorsCounter/VisitorCounter.js')
const ContactFormRoute = require('./routes/ContactForm/ContactForm.js')
const Tictactoe = require('./routes/Tictactoe/Tictactoe.js')
const express = require('express')
const cors = require('cors');
require('dotenv').config()
const app = express()
app.use(express.json())
app.use(cors());

const port = process.env.PORT || 8080

// routes
app.get('/', (req, res) => { res.send('Hello World!') })
app.use('/visitor', VisitorRoute)
app.use('/tictactoe', Tictactoe)
app.use('/contactForm', ContactFormRoute)

// <-routes

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

