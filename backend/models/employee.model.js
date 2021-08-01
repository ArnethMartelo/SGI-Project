const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const employeeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "is required"],
      trim: true,
    },
    idType: {
      type: String,
      required: [true, "is required"],
    },
    idNumber: {
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
    position: {
      type: String,
      required: [true, "is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "is required"],
      trim: true,
      minLength: [8, "Mínimo 8 caracteres"],
    },
    role: {
      type: String,
      required: [true, "is required"],
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timeStamps: true,
  }
);

employeeSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Employee", employeeSchema);
