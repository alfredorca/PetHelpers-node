const {Schema, model} = require('mongoose');

const ProviderSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'The name is required'],
      unique: true
    },
    services: {
      type: [Schema.Types.ObjectId],
      ref: 'Service',
      required: [true, 'At least one service must be provided']
    },
    type: {
      type: String,
      enum: ['COMPANY', 'INDEPENDENT'],
      required: [true, 'You must choose a type of provider ']
    },
  }
)

module.exports = model('Provider', ProviderSchema)