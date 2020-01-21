const express = require("express");
const userRouter = require("./routers/user");
const settingsRouter = require("./routers/settingsTable");
const itemsMenuRouter = require("./routers/itemsMenu");
const warehouseRouter = require("./routers/warehouse");
const path = require('path');
const http = require('http');

require('dotenv').config({path: __dirname + '/.env'});
require("./db/db");

const port = process.env.PORT || 3000;

const app = express();

let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);
//CORS Middleware
app.use(function (req, res, next) {
//Enabling CORS
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization');
  next();
});


app.use(express.json());
app.use(userRouter);
app.use(settingsRouter);
app.use(itemsMenuRouter);
app.use(warehouseRouter);

io.on('connection', (socket) => {
  console.log('user connected');
});
// Serve only the static files form the dist directory

app.use(express.static(__dirname + '/dist/managerAppFrontend'));

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/managerAppFrontend/index.html'));
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
