const {model, Schema} = require('mongoose');

const OfferSchema = Schema(
  {
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service", 
      required: [true, 'the name of the service is required']
    },
    animal: {
      type: Schema.Types.ObjectId,
      ref: "Species",
      required: [true, 'The species of the animal is required.']
    },
    price: {
      type: Number,
      required: [true, "You must enter a price"]
    }, 
    provider: {
      type: Schema.Types.ObjectId,
      ref: "Provider",
      required: [true, "You must enter a provider"]
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    pet: {
      type: Schema.Types.ObjectId,
      ref: "Pet",
      required: [true, "You must enter a pet"]
    }
  }
)

module.exports = model('Offer', OfferSchema);