const mongoose = require("mongoose");

const warehouseSchema = mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  },
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


warehouseSchema.static('findAll', function() {
  return this.find({}).sort({created_at: -1});
});

const Warehouse = mongoose.model("Warehouse", warehouseSchema);

module.exports = Warehouse;
