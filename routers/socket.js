var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  //Connect to Socket.io for each user connection
  var io = req.app.get('socketio')
  io.on('socketToMe', function (res) {})
  io.emit('socketToMe', 'lol')
})

module.exports = router
