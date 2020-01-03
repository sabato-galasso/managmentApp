const express = require("express");
const setTable = require("../models/SettingsTable");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/api/settings-table", auth, async (req, res) => {
  // Create a new settings
  try {
    const settings = new setTable(req.body);
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token;
    });
    await settings.save();
    res.status(201).send();
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/api/settings-table", auth, async (req, res) => {
  // Create a new settings
  try {
    const settings = new setTable(req.body);
    const filter = { _id: req.body._id };
    //const update = settings.quantity
    const doc = await setTable.findOneAndUpdate(filter,settings);
    res.status(201).send();
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/api/settings-table", auth, async (req, res) => {
  // Get settings
  try {
    const settings = await setTable.findLastOne();
    res.status(200).send(settings);
  } catch (error) {
    res.status(400).send(error);
  }
});



module.exports = router;
