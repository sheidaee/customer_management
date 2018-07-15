const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema(
  {
    name: {
      first: String,
      last: String
    },
    birthday: Date,
    gender: String,
    customerLifetimeValue: Number
  },
  {
    timestamps: true
  }
);

CustomerSchema.virtual("customerID").get(function() {
  return this._id;
});

module.exports = mongoose.model('Customer', CustomerSchema);