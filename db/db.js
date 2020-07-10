const mongoose = require('mongoose')
const url =
  process.env.MONGODB_URL ||
  'mongodb+srv://admin:i6808pREhmdCW5JR@clustermanagment-ibgct.mongodb.net/managment?retryWrites=true&w=majority'
const db = mongoose.connection

mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

db.once('open', (_) => {
  console.log('Database connected:', url)
})

db.on('error', (err) => {
  console.error('connection error:', err)
})
