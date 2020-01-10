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



module.exports = router;
