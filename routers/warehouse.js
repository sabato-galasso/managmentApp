const express = require("express");
const warehouseModel = require("../models/Warehouse");
const auth = require("../middleware/auth");
const router = express.Router();



router.get("/api/warehouse", auth, async (req, res) => {
  // Get settings
  try {
    const doc = await warehouseModel.findAll();
    res.status(200).send(doc);
  } catch (error) {
    res.status(400).send(error);
  }
});


router.get("/api/warehouse/category/:category", auth, async (req, res) => {
  // Get warehouse category
  try {
    const filter = {category: req.params.category };
    const doc = await warehouseModel.findByCategory(filter);
    res.status(200).send(doc);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/api/warehouse", auth, async (req, res) => {
  // Create a new settings
  try {
    const settings = new warehouseModel(req.body);
    const filter = { _id: req.body._id };
    //const update = settings.quantity
    const doc = await warehouseModel.findOneAndUpdate(filter,settings);
    res.status(201).send(doc._doc);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/api/warehouse", auth, async (req, res) => {
  // Create a new settings
  try {
    const item = new warehouseModel(req.body);
    await item.save();
    res.status(201).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/api/warehouse/", auth, async (req, res) => {
  // Delete row settings
  try {
    //const queryStuff = JSON.stringify(req.query);
    const filter = { _id: req.query._id };
    //const update = settings.quantity
    const doc = await warehouseModel.findOneAndDelete(filter);
    res.status(201).send(doc._doc);
  } catch (error) {
    res.status(400).send(error);
  }
});



module.exports = router;
