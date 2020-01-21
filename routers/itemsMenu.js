const express = require("express");
const itemsMenuModel = require("../models/ItemsMenu");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/api/items-menu", auth, async (req, res) => {
  // Create a new settings
  try {
    const doc = new itemsMenuModel(req.body);
    await doc.save();
    res.status(201).send(doc);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/api/items-menu", auth, async (req, res) => {
  // Create a new settings
  try {
    const rowData = new itemsMenuModel(req.body);
    const filter = { _id: req.body._id };
    //const update = settings.quantity
    const doc = await itemsMenuModel.findOneAndUpdate(filter,rowData);
    res.status(201).send(doc);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/api/items-menu", auth, async (req, res) => {
  // Create a new settings
  try {
    const items = await itemsMenuModel.find();
    res.status(200).send(items);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/api/items-menu/", auth, async (req, res) => {
  // Delete row settings
  try {
    const filter = { _id: req.query._id };
    //const update = settings.quantity
    const doc = await itemsMenuModel.findOneAndDelete(filter);
    res.status(201).send(doc._doc);
  } catch (error) {
    res.status(400).send(error);
  }
});



module.exports = router;
