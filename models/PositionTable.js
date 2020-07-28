const mongoose = require('mongoose')

const positionTableSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  positionX: {
    type: Number,
    required: true,
  },
  positionY: {
    type: Number,
    required: true,
  },
})

positionTableSchema.static('findLastOne', function () {
  return this.findOne()
})

const PositionTable = mongoose.model('PositionTable', positionTableSchema)

module.exports = PositionTable
