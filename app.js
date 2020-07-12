const express = require('express')
const userRouter = require('./routers/user')
const settingsRouter = require('./routers/settingsTable')
const itemsMenuRouter = require('./routers/itemsMenu')
const warehouseRouter = require('./routers/warehouse')
const customersRouter = require('./routers/customers')
const categoryRouter = require('./routers/category')
const menuRouter = require('./routers/menu')
const customerLIst = require('./routers/customerList')
const path = require('path')
//require('dotenv').config({ path: __dirname + '/.env' })

process.env.NODE_TLS_REJECT_UNAUTHORIZED = undefined
process.env.NODE_TLS_REJECT_UNAUTHORIZED || 0

//const socketRouter = require("./routers/socket");
const port = process.env.PORT || 8080
const app = express()

require('./db/db')

//CORS Middleware
app.use(function (req, res, next) {
  //Enabling CORS
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})

app.use(express.json())
app.use(userRouter)
app.use(settingsRouter)
app.use(itemsMenuRouter)
app.use(warehouseRouter)
app.use(customersRouter)
app.use(categoryRouter)
app.use(menuRouter)
app.use(customerLIst)

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/managerAppFrontend'))

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/managerAppFrontend/index.html'))
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
