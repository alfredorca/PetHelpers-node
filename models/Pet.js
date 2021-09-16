const {model, Schema} = require('mongoose');

const PetSchema = Schema(
  {
    name: {
      type: String
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: "Species",
      required: [true, "You must enter the species of your pet."]
    }
  }
)

module.exports = model("Pet", PetSchema)