const mongoose = require("mongoose");
const url = process.env.MONGODB_URL;
const db = mongoose.connection;
require('../models/User');

mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

db.once("open", _ => {
  console.log("Database connected:", url);
});

db.on("error", err => {
  console.error("connection error:", err);
});
