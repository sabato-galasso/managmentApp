const mongoose = require("mongoose");

const itemsMenuSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
    required: true
  },
});

itemsMenuSchema.static('findAll', function() {
  return this.find();
});

const ItemsMenu = mongoose.model("ItemsMenu", itemsMenuSchema);

module.exports = ItemsMenu;
