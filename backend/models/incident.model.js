const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const employee = require("./employee.model");
const Schema = mongoose.Schema;
const incidentSchema = new Schema(
  {
    serial: { type: Number, required: true, unique: true },
    date: { type: Date, required: true },
    site: { type: String, required: true },
    type: { type: String, required: true },
    deadly: { type: Boolean, required: true },
    description: { type: String },
    victim: { type: Schema.ObjectId, ref: employee },
    informer: { type: Schema.ObjectId, ref: employee },
  },
  {
    timeStamps: true,
  }
);
incidentSchema.plugin(uniqueValidator);
module.exports = mongoose.model("incident", incidentSchema);
