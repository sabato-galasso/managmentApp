const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    nameFirstLevel: {
      type: String,
    },
    slugCategoryFirst: {
      type: String,
    },
    slugCategory: {
      type: String,
      required: true,
    },
    nameCategory: {
      type: String,
      required: true,
    },
  },
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


categorySchema.static('findAll', function() {
  return this.find({}).sort({created_at: -1});
});

categorySchema.static('findByCategory',function (res) {

  return this.find(res).sort({created_at: -1});
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
