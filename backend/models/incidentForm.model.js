const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const incident = require("./incident.model");
const informer = require("./employee.model");
const victim = require("./employee.model");
const employer = require("./employer.model");

const Schema = mongoose.Schema;

const incidentFormSchema = new Schema();

incidentFormSchema
  .add(employer)
  .add(victim)
  .add(incident)
  .add(informer)
  .add(
    {
      serial: {
        type: Number,
        required: true,
        unique: true,
      },
      date: {
        type: Date,
        required: true,
      },
    },
    {
      timeStamps: true,
    }
  );

incidentFormSchema.plugin(uniqueValidator);
module.exports = mongoose.model("IncidentForm", incidentFormSchema);
