const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const employerSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    nit: {
      type: Number,
      required: false,
      trim: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

employerSchema.plugin(uniqueValidator);
module.exports = mongoose.model("employer", employerSchema);
