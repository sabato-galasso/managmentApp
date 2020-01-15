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
});

warehouseSchema.static('findAll', function() {
  return this.find({}, function (err, docs) {
    console.log(err)
    console.log(docs)
    }
  ).sort({"_id":"desc"});
});

const Warehouse = mongoose.model("Warehouse", warehouseSchema);

module.exports = Warehouse;
