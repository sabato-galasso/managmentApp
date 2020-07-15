const express = require('express')
const customerModel = require('../models/Customer')
const auth = require('../middleware/auth')
const router = express.Router()
const _ = require('lodash')

router.delete('/api/delete-customer', auth, async (req, res) => {
  // Delete row settings
  try {
    const filter = { _id: req.query._id }
    const doc = await customerModel.findByIdAndRemove(filter)
    res.status(201).send(doc)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post('/api/customer', auth, async (req, res) => {
  try {
    const doc = new customerModel(req.body)
    await doc.save(function (err, result) {
      if (err) console.log(err)
      else {
        var id = result._id
        console.log('successfully added with id', id)
        res.status(201).send({
          _id: id,
          summed: _.orderBy(
            _(result._doc.consumazioni)
              .groupBy('nameArticle')
              .map((objs, key) => {
                return {
                  store: key,
                  quantity: _.sumBy(objs, 'quantity'),
                  price: _.round(_.sumBy(objs, 'price'), 2),
                  ids: objs[0]._id,
                }
              })
              .value(),
            [(item) => item.store.toLowerCase()],
            ['asc']
          ),
          total: _.round(_.sumBy(result._doc.consumazioni, 'price'), 2),
        })
      }
    })
  } catch (error) {
    res.status(400).send(error)
  }
})

router.put('/api/customer', auth, async (req, res) => {
  try {
    const filter = { nTable: req.body.nTable, statusTable: 1 }
    let consumazioni = req.body.consumazioni
    let doc = await customerModel.findOneAndUpdate(
      filter,
      { $push: { consumazioni: consumazioni } },
      { new: true, sort: { _id: -1 } }
    )
    res.status(201).send({
      _id: doc._doc._id,
      summed: _.orderBy(
        _(doc._doc.consumazioni)
          .groupBy('nameArticle')
          .map((objs, key) => {
            return {
              store: key,
              quantity: _.sumBy(objs, 'quantity'),
              price: _.round(_.sumBy(objs, 'price'), 2),
              ids: objs[0]._id,
            }
          })
          .value(),
        [(item) => item.store.toLowerCase()],
        ['asc']
      ),
      total: _.round(_.sumBy(doc._doc.consumazioni, 'price'), 2),
    })
  } catch (error) {
    res.status(400).send(error)
  }
})

router.put('/api/customer-remove', auth, async (req, res) => {
  try {
    const filter = { _id: req.body._id }
    let index = req.body.index
    await customerModel.findOneAndUpdate(
      filter,
      { $unset: { ['consumazioni.' + index]: 1 } },
      { new: true }
    )
    await customerModel.findOneAndUpdate(
      filter,
      { $pull: { consumazioni: null } },
      { new: true }
    )
    let doc = await customerModel.findOne(filter)
    res.status(201).send({
      _id: doc._doc._id,
      summed: _.orderBy(
        _(doc._doc.consumazioni)
          .groupBy('nameArticle')
          .map((objs, key) => {
            return {
              store: key,
              quantity: _.sumBy(objs, 'quantity'),
              price: _.round(_.sumBy(objs, 'price'), 2),
              ids: objs[0]._id,
            }
          })
          .value(),
        [(item) => item.store.toLowerCase()],
        ['asc']
      ),
      total: _.round(_.sumBy(doc._doc.consumazioni, 'price'), 2),
    })
  } catch (error) {
    res.status(400).send(error)
  }
})

router.put('/api/customer-remove/index', auth, async (req, res) => {
  try {
    const filter = { _id: req.body._id }
    let doc = await customerModel.findOne(filter)

    res.status(201).send({
      index: doc._doc.consumazioni.findIndex((el) => el._id === req.body.ids),
    })
  } catch (error) {
    res.status(400).send(error)
  }
})

router.put('/api/customer/close', auth, async (req, res) => {
  try {
    const filter = { nTable: req.body.nTable }
    const doc = await customerModel.findOneAndUpdate(
      filter,
      {
        $set: { statusTable: 0 },
      },
      { sort: { _id: -1 } }
    )
    res.status(201).send(doc)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/api/customer', auth, async (req, res) => {
  try {
    const filter = { nTable: req.query.n }
    let items = await customerModel.findByTableOpened(filter)
    if (
      items &&
      items._doc.consumazioni &&
      items._doc.consumazioni.length > 0
    ) {
      res.status(200).send({
        summed: _.orderBy(
          _(items._doc.consumazioni)
            .groupBy('nameArticle')
            .map((objs, key) => {
              return {
                store: key,
                quantity: _.sumBy(objs, 'quantity'),
                price: _.round(_.sumBy(objs, 'price'), 2),
                ids: objs[0]._id,
              }
            })
            .value(),
          [(item) => item.store.toLowerCase()],
          ['asc']
        ),
        _id: items._doc._id,
        total: _.round(_.sumBy(items._doc.consumazioni, 'price'), 2),
      })
    } else {
      res.status(200).send({ summed: [], _id: null, total: 0.0 })
    }
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/api/all-customer', auth, async (req, res) => {
  try {
    let items = await customerModel.findAllWithStatus()
    /* if(items && items.length > 0){
      items.forEach( el=> {

      })
    }*/
    /*  if (
      items &&
      items._doc.consumazioni &&
      items._doc.consumazioni.length > 0
    ) {
      res.status(200).send({
        summed: _(items._doc.consumazioni)
          .groupBy('nameArticle')
          .map((objs, key) => {
            return {
              store: key,
              quantity: _.sumBy(objs, 'quantity'),
              price: _.round(_.sumBy(objs, 'price'), 2),
              ids: objs[0]._id,
            }
          })
          .value(),
        _id: items._doc._id,
        total: _.round(_.sumBy(items._doc.consumazioni, 'price'), 2),
      })
    } else {
      res.status(200).send({ summed: [], _id: null, total: 0.0 })
    }*/

    res.status(200).send(items)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/api/customer-open', auth, async (req, res) => {
  try {
    const filter = { statusTable: 1, category: 'customer' }
    let items = await customerModel.find(filter)
    res.status(200).send(items)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/api/customer-opened', auth, async (req, res) => {
  try {
    const filter = { nTable: { $regex: req.query.nTable }, statusTable: 1 }
    let items = await customerModel.find(filter)
    res.status(200).send(items)
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router
