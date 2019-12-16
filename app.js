const express = require("express");
const userRouter = require("./routers/user");
const settingsRouter = require("./routers/settingsTable");
const path = require('path');
const port = process.env.PORT;

require("./db/db");

const app = express();
//CORS Middleware
app.use(function (req, res, next) {
//Enabling CORS
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization');
  next();
});


app.use(express.json());
app.use(userRouter);
app.use(settingsRouter);

// Serve only the static files form the dist directory
//app.use(express.static(__dirname + '/dist/managerAppFrontend'));

//app.get('/*', function(req,res) {
  //res.sendFile(path.join(__dirname+'/dist/managerAppFrontend/index.html'));
//});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
