const app = require('express')()
const http = require('http').createServer(app)
require('dotenv').config()


app.get('/', (req, res) => {
    res.send("Node Server is running. Yay!!")
})

//Socket Logic
const io = require('socket.io')(http)

io.on('connection', (socket) => {
console.log('new connection made');

for(var i = 1; i <= 10; i++){
generateSocket(i, socket);
}
})

 function stopwatchCalc(sec) {
    //const pph = this.getFieldFloatValue();
    const pph = 10.00;
    return round((pph * sec) / 3600, 2);
  }

  function round(n, dec) {
    let x = n * Math.pow(10, dec);
    x = Math.round(x);
    return (x / Math.pow(10, dec)).toFixed(dec);
  }

  function CustomerTable(data) {
    this.timer = data.timer;
    this.price = data.price;
    this.status = data.status;
  }



function generateSocket (id, socket) {

var timerRef

socket.on(`counter${id}`, () => {
  var counter  = 0
       const startTime = Date.now() - (counter || 0);
         timerRef = setInterval(() => {
          var counter = Date.now() - startTime;
          var seconds = `0${Math.floor(counter / 1000) % 60}`.slice(-2);
          var minutes = `0${Math.floor(counter / 60000) % 60}`.slice(-2);
          var hours = `0${Math.floor(counter / 3600000)}`.slice(-2);
          var price = stopwatchCalc(Math.floor(counter / 1000));
          socket.emit(`result${id}`, {timer :  hours + ':' + minutes + ':' + seconds, price: price, status: 1})
        },1000);
});

socket.on(`else${id}`, () =>  {
                console.log("something else");
                clearInterval(timerRef);
          socket.emit(`result${id}`,  '0')
           });
}

http.listen(process.env.PORT)
