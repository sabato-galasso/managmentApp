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
  price: {
    type: Number,
    required: true
  }
},
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

itemsMenuSchema.static('findAll', function() {
  return this.find({}).sort({created_at: -1});
});

const ItemsMenu = mongoose.model("ItemsMenu", itemsMenuSchema);

module.exports = ItemsMenu;
