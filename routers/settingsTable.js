const express = require('express')
const setTable = require('../models/SettingsTable')
const posTable = require('../models/PositionTable')
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/api/settings-table', auth, async (req, res) => {
  // Create a new settings
  try {
    const settings = new setTable(req.body)
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token
    })
    await settings.save()
    res.status(201).send()
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post('/api/settings-table-position', auth, async (req, res) => {
  try {
    let obj = req.body
    posTable.update(
      { id: req.body.id }, // find a document with that filter
      obj, // document to insert when nothing was found
      { upsert: true, setDefaultsOnInsert: true },
      function (err) {}
    )
    res.status(201).send()
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/api/settings-table-position', auth, async (req, res) => {
  try {
    const filter = { id: { $regex: req.query.id } }
    let items = await posTable.find(filter)
    res.status(200).send(items)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.put('/api/settings-table', auth, async (req, res) => {
  // Create a new settings
  try {
    const settings = new setTable(req.body)
    const filter = { _id: req.body._id }
    //const update = settings.quantity
    const doc = await setTable.findOneAndUpdate(filter, settings)
    res.status(201).send(doc)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/api/settings-table', auth, async (req, res) => {
  // Get settings
  try {
    const settings = await setTable.findLastOne()
    res.status(200).send(settings)
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router
