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
{ timestamps: { createdAt: 'created_at', update_at: 'updated_at' } });


warehouseSchema.static('findAll', function() {
  return this.find({}, function (err, docs) {
    console.log(err)
    }
  ).sort({"updated_at":"desc"});
});

const Warehouse = mongoose.model("Warehouse", warehouseSchema);

module.exports = Warehouse;
