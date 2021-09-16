const {model, Schema} = require('mongoose');

const ServiceSchema = Schema(
  {
    activity: {
      type: String, 
      required: [true, 'the name of the service is required']
    },
    possibleAnimals: {
      type: [Schema.Types.ObjectId],
      ref: "Species",
      required: [true, "You must enter at least 1 animal."]
    }
  }
)

module.exports = model('Service', ServiceSchema);