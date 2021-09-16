const {Schema, model} = require('mongoose');

const SpeciesSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "You must enter a species"]
    }
  }
)

module.exports = model('Species', SpeciesSchema)