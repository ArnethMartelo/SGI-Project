const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const employerSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "is required"],
      trim: true,
    },
    nit: {
      type: Number,
      required: [true, "is required"],
      trim: true,
      unique: true,
    },
    address: {
      type: String,
      required: [true, "is required"],
      trim: true,
    },
    phoneNumber: {
      type: Number,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "is required"],
      trim: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "Correo inválido"],
    },
  },
  {
    timeStamps: true,
  }
);

employerSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Employer", employerSchema);
