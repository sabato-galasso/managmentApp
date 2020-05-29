const mongoose = require("mongoose");

const menuSchema = mongoose.Schema({
  price: {
    type: Number,
    required: true,
  },
  nameArticle: {
    type: String,
    required: true,
  },
  nameCategory: {
    type: String,
    required: true,
  },
  slugCategory:{
    type: String,
    required: true,
  },
    nameFirstLevel:{
      type: String,
    },
    slugCategoryFirstLevel:{
      type: String,
    },
  },
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


menuSchema.static('findAll', function() {
  return this.find({}).sort({created_at: -1});
});

menuSchema.static('findBySlugCategory',function (res) {

  return this.find(res).sort({created_at: -1});
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
