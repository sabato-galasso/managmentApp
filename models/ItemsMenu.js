const mongoose = require("mongoose");

const itemsMenuSchema = mongoose.Schema({
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
  }
},
  { timestamps: { createdAt: 'created_at', update_at: 'updated_at' } });

itemsMenuSchema.static('findAll', function() {
  return this.find().sort({"_id":"desc"});
});

const ItemsMenu = mongoose.model("ItemsMenu", itemsMenuSchema);

module.exports = ItemsMenu;
