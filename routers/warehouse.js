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



module.exports = router;
