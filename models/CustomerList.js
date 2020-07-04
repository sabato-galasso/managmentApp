const mongoose = require('mongoose')

const customerListSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

customerListSchema.static('findAll', function () {
  return this.find({}).sort({ created_at: -1 })
})

const CustomerList = mongoose.model('CustomerList', customerListSchema)

module.exports = CustomerList
