const mongoose = require('mongoose')

const customerSchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    statusTable: {
      type: Number,
      required: true,
    },
    priceTable: {
      type: Number,
      required: true,
    },
    nTable: {
      type: String,
      required: true,
    },
    consumazioni: {
      type: Array,
      default: [],
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

customerSchema.static('findAll', function () {
  return this.find({}).sort({ created_at: -1 })
})

customerSchema.static('findByTableOpened', function (res) {
  return this.findOne({ nTable: res.nTable, statusTable: 1 }).sort({
    created_at: -1,
  })
})

customerSchema.static('findAllWithStatus', function () {
  return this.find({}).sort({ created_at: -1 })
})

const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer
