const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const employee = require("./employee.model");
const employer = require("./employer.model");
const Schema = mongoose.Schema;
const incidentSchema = new Schema(
  {
    serial: { type: Number, required: true, unique: true },
    date: { type: Date, required: true },
    site: { type: String, required: true },
    type: { type: String, required: true },
    deadly: { type: String, required: true },
    description: { type: String },
    victim_id: { type: Schema.ObjectId, ref: employee },
    informer_id: { type: Schema.ObjectId, ref: employee },
    employer: { type: Schema.ObjectId, ref: employer },
  },
  {
    versionKey: false,
    timeStamps: true,
  }
);
incidentSchema.plugin(uniqueValidator);
module.exports = mongoose.model("incident", incidentSchema);
