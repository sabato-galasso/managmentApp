const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const expressSession = require('express-session')
const sharedsession = require('express-socket.io-session')

var app = express()

var http = require('http').createServer(app)
var io = require('socket.io').listen(http)

app.set('port', process.env.PORT || 1234)

app.use(cookieParser())

app.use(
  expressSession({
    key: 'userID',
    secret: 'k39dzqlp@k5d&k@dh&',
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 1200000 },
  })
)

io.use(
  sharedsession(
    expressSession({
      key: 'userID',
      secret: 'k39dzqlp@k5d&k@dh&',
      saveUninitialized: false,
      resave: false,
      cookie: { maxAge: 1200000 },
    })
  )
)

var activeClientId
var clientQ = []
var clients = {}
var numUsers = 0

app.get('/', (req, res) => {
  res.send('Node Server is running. Yay!!')
})
//Socket Logic
io.set('transports', ['websocket'])

io.on('connection', (socket) => {
  clients[socket.id] = socket
  clientQ.push(socket.id)
  numUsers = Object.keys(clients).length
  socket.id = 'someId'
  io.sockets.connected['someId'] = io.sockets.connected[socket.id]
  console.log('new connection made')
  socket.on('join', function (room) {
    console.log('room', room)
    socket.join(room)
  })

  //console.log(socket.handshake.session.id)
  //console.log('dsf', socket.session)
  for (var i = 1; i <= 10; i++) {
    generateSocket(i, socket)
  }
})

function stopwatchCalc(sec) {
  //const pph = this.getFieldFloatValue();
  const pph = 10.0
  return round((pph * sec) / 3600, 2)
}

function round(n, dec) {
  let x = n * Math.pow(10, dec)
  x = Math.round(x)
  return (x / Math.pow(10, dec)).toFixed(dec)
}

function CustomerTable(data) {
  this.timer = data.timer
  this.price = data.price
  this.status = data.status
}

function generateSocket(id, socket) {
  var timerRef
  var running = false
  var paused = false
  var counter = 0
  var seconds = 0
  var minutes = 0
  var hours = 0
  socket.on(`counter${id}`, (res) => {
    let tableStorage = JSON.parse(res)
    //tableStorage.counter = 0
    running = !running
    if (running) {
      const startTime =
        tableStorage &&
        tableStorage.hasOwnProperty('counter') &&
        tableStorage.counter != 0
          ? tableStorage.counter
          : Date.now() - (counter || 0)

      console.log('startTime', startTime)
      timerRef = setInterval(() => {
        counter = Date.now() - startTime
        console.log('counter', counter)

        seconds = `0${Math.floor(counter / 1000) % 60}`.slice(-2)
        minutes = `0${Math.floor(counter / 60000) % 60}`.slice(-2)
        hours = `0${Math.floor(counter / 3600000)}`.slice(-2)
        var price = stopwatchCalc(Math.floor(counter / 1000))
        socket.emit(`result${id}`, {
          timer: hours + ':' + minutes + ':' + seconds,
          price: price,
          status: 1,
          sessionID: socket.id,
        })
        console.log(hours + ':' + minutes + ':' + seconds + socket.id)
        //console.log('clients[socket.id]', clients[socket.id])
        //    console.log('clientQ', clientQ)
      }, 1000)
    } else {
      clearInterval(timerRef)
      paused = true
    }
  })

  socket.on(`end${id}`, function () {
    clearInterval(timerRef)
    counter = 0
    socket.emit(`result${id}`, '0')
    delete clients[socket.id]
    numUsers = Object.keys(clients).length
    console.log('numUsers-clear', numUsers)
  })

  socket.on(`pause${id}`, () => {
    console.log('something else')
    clearInterval(this.timerRef)
    //socket.emit(`result${id}`, '0')
  })
}

http.listen(process.env.PORT)
