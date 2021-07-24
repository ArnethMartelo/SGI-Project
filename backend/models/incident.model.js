const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const incidentSchema = new Schema({
  date: { type: Date, required: true },
  site: { type: String, required: true },
  type: { type: String, required: true },
  deadly: { type: Boolean, required: true },
  description: { type: String },
});
module.exports = mongoose.model("incident", incidentSchema);
