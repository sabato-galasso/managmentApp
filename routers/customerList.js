const express = require('express')
const customerListModel = require('../models/CustomerList')
const auth = require('../middleware/auth')
const router = express.Router()
const _ = require('lodash')

router.post('/api/customer-list', auth, async (req, res) => {
  try {
    const doc = new customerListModel(req.body)
    await doc.save(function (err, result) {
      if (err) {
        console.log(err)
        res.status(400).send('Cliente già registrato')
      } else {
        res.status(201).send(doc)
      }
    })
  } catch (error) {
    res.status(400).send(error)
  }
})

router.put('/api/customer-list', auth, async (req, res) => {
  try {
    const filter = { _id: req.body._id }
    let consumazioni = req.body.consumazioni
    let doc = await customerListModel.findOneAndUpdate(
      filter,
      { $push: { consumazioni: consumazioni } },
      { new: true }
    )
    res.status(201).send({
      id: doc._doc._id,
      summed: _(doc._doc.consumazioni)
        .groupBy('nameArticle')
        .map((objs, key) => {
          return {
            store: key,
            quantity: _.sumBy(objs, 'quantity'),
            price: _.sumBy(objs, 'price'),
          }
        })
        .value(),
      total: _.sumBy(doc._doc.consumazioni, 'price'),
    })
  } catch (error) {
    res.status(400).send(error)
  }
})

router.put('/api/customer/close', auth, async (req, res) => {
  try {
    const filter = { _id: req.body._id }
    const doc = await customerListModel.findOneAndUpdate(filter, {
      $set: { statusTable: 0 },
    })
    res.status(201).send(doc)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/api/customer-list', auth, async (req, res) => {
  try {
    let items = await customerListModel.find()
    res.status(200).send(items)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.delete('/api/customer-list/', auth, async (req, res) => {
  // Delete row settings
  try {
    const filter = { _id: req.query._id }
    //const update = settings.quantity
    const doc = await itemsMenuModel.findOneAndDelete(filter)
    res.status(201).send(doc._doc)
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router
