const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const employeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    secondLastName: {
      type: String,
      required: false,
      trim: true,
    },
    idType: {
      type: String,
      required: true,
      trim: true,
    },
    idNumber: {
      type: Number,
      required: true,
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
    position: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

employeeSchema.plugin(uniqueValidator);
module.exports = mongoose.model("employee", employeeSchema);
