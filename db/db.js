const mongoose = require("mongoose");
const url = process.env.MONGODB_URL || 'mongodb://localhost:27017/app';
const db = mongoose.connection;

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
