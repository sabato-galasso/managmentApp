const express = require("express");
const menuCategory = require("../models/Category");
const auth = require("../middleware/auth");
const router = express.Router();



router.get("/api/category", auth, async (req, res) => {
  // Get settings
  try {
    const doc = await menuCategory.findAll();
    res.status(200).send(doc);
  } catch (error) {
    res.status(400).send(error);
  }
});


router.get("/api/category/category/:category", auth, async (req, res) => {
  // Get warehouse category
  try {
    const filter = {category: req.params.category };
    const doc = await menuCategory.findByCategory(filter);
    res.status(200).send(doc);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/api/category", auth, async (req, res) => {
  // Create a new settings
  try {
    const settings = new menuCategory(req.body);
    const filter = { _id: req.body._id };
    //const update = settings.quantity
    const doc = await menuCategory.findOneAndUpdate(filter,settings);
    res.status(201).send(doc._doc);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/api/category", auth, async (req, res) => {
  // Create a new category
  try {
    const item = new menuCategory(req.body);
    await item.save();
    res.status(201).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/api/category/", auth, async (req, res) => {
  // Delete row settings
  try {
    //const queryStuff = JSON.stringify(req.query);
    const filter = { _id: req.query._id };
    //const update = settings.quantity
    const doc = await menuCategory.findOneAndDelete(filter);
    res.status(201).send(doc._doc);
  } catch (error) {
    res.status(400).send(error);
  }
});



module.exports = router;
