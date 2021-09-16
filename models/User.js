const { model, Schema } = require("mongoose");
const crypto = require("crypto");
const {uuid} = require('uuidv4')

const UserSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  hashed_password: {
    type: String,
    required: true,
  },
  salt: String,
  role: {
    type: String,
    enum: ["PROVIDER", "USER"],
    default: 'USER'
  },
  pet: {
    type: Schema.Types.ObjectId
  }
});

UserSchema.virtual('password')
.set(function(password) {
  this._password = password;
  this.salt = uuid();
  this.hashed_password = this.encryptPassword(password);
})
.get(function() {
  return this._password
});

UserSchema.methods = {
  authenticate: function (text) {
    return this.encryptPassword(text) === this.hashed_password
  },

  encryptPassword: function (password) {
    if (!password) return console.log("MUST ENTER A PASSWORD");
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (error) {
      return 'error could not encrypt';
    }
  },
};

module.exports = model('User', UserSchema);