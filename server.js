const VisitorRoute = require('./routes/VisitorsCounter/VisitorCounter.js')
const ContactFormRoute = require('./routes/ContactForm/ContactForm.js')
const Tictactoe = require('./routes/Tictactoe/Tictactoe.js')
const socket = require('socket.io')
const express = require('express')
const http = require('http')
const cors = require('cors');
require('dotenv').config()
const app = express()
app.use(express.json())
app.use(cors());

const Port = process.env.PORT || 8080

// routes
app.get('/', (req, res) => { res.send('Hello World!') })
app.use('/visitor', VisitorRoute)
app.use('/tictactoe', Tictactoe)
app.use('/contactForm', ContactFormRoute)
// <-routes

//socket.io
const server = http.createServer(app)
const io = socket(server)

let interval

io.on("connection", (socket) => {
  console.log("New client connected!! ");
  if (interval) {
    clearInterval(interval)
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);

  socket.on("disconnect", () => {
    console.log("Client disconnect");
    clearInterval(interval);
  })
})

const getApiAndEmit = socket => {
  const response = "This is socket io response !!"
  socket.emit("FromAPI", response)
}
//<- socket.io


app.listen(Port, () => {
  console.log(`Example app listening at http://localhost:${Port}`)
})

