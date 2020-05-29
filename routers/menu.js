const express = require("express");
const menuModel = require("../models/Menu");
const auth = require("../middleware/auth");
const router = express.Router();



router.get("/api/menu", auth, async (req, res) => {
  // Get settings
  try {
    const doc = await menuModel.findAll();
    res.status(200).send(doc);
  } catch (error) {
    res.status(400).send(error);
  }
});


router.get("/api/menu/category/:category", auth, async (req, res) => {
  // Get warehouse category
  try {
    const filter = {slugCategory: req.params.category };
    const doc = await menuModel.findBySlugCategory(filter);
    res.status(200).send(doc);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/api/menu/subcategory/:category", auth, async (req, res) => {
  // Get warehouse category
  try {
    const filter = {slugCategoryFirstLevel: req.params.category };
    const doc = await menuModel.findBySlugCategory(filter);
    res.status(200).send(doc);
  } catch (error) {
    res.status(400).send(error);
  }
});



router.put("/api/menu", auth, async (req, res) => {
  // Create a new settings
  try {
    const settings = new menuModel(req.body);
    const filter = { _id: req.body._id };
    //const update = settings.quantity
    const doc = await menuModel.findOneAndUpdate(filter,settings);
    res.status(201).send(doc._doc);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/api/menu", auth, async (req, res) => {

  // Create a new settings
  try {
    const item = new menuModel(req.body);
    await item.save();
    res.status(201).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/api/menu/", auth, async (req, res) => {
  // Delete row settings
  try {
    //const queryStuff = JSON.stringify(req.query);
    const filter = { _id: req.query._id };
    //const update = settings.quantity
    const doc = await menuModel.findOneAndDelete(filter);
    res.status(201).send(doc._doc);
  } catch (error) {
    res.status(400).send(error);
  }
});



module.exports = router;
