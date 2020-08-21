const mongoose = require('mongoose')

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
    seq: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

categorySchema.static('findAll', function () {
  return this.find({}).sort({ seq: 1 })
})

categorySchema.static('findByCategory', function (res) {
  return this.find(res).sort({ seq: 1 })
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category
