const mongoose = require("mongoose");

const settingTableSchema = mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

settingTableSchema.static('findLastOne', function() {
  return this.findOne();
});

const Settings = mongoose.model("SettingsTable", settingTableSchema);

module.exports = Settings;
