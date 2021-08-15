const Incident = require("../models/incident.model");
const _ = require("underscore");

//Create incident
exports.create = async (req, res) => {
  try {
    const incident = new Incident(req.body);
    await incident.save();
    res.status(201).json({
      message: "Incident created!",
      incident: incident,
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({
      message: "Error creating incident",
    });
  }
};

//Get all incidents
exports.list = async (req, res) => {
  try {
    const incidents = await Incident.find()
      .populate("victim_id")
      .populate("informer_id");
    res.status(200).json(incidents);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "Error listing incidents" });
  }
};

//Search incident
exports.search = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id)
      .populate("victim")
      .populate("informer");
    res.status(200).json({
      message: "Incident found",
      incident,
    });
  } catch (e) {
    console.log(e.message);
    res.status(404).json({ message: "Incident not found" });
  }
};

//Update incident
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const incident = _.pick(req.body, [
      "serial",
      "date",
      "site",
      "type",
      "deadly",
      "description",
      "victim_id",
      "informer_id",
    ]);
    const incidentBD = await Incident.findByIdAndUpdate(id, incident, {
      new: true,
      runValidators: true,
      context: "query",
    });
    res.status(200).json({
      message: "Incident Updated!",
      incidentBD,
    });
  } catch (e) {
    console.log(e.message);
    res.status(404).json({ message: "Incident not found" });
  }
};

//Delete incident
exports.delete = async (req, res) => {
  try {
    await Incident.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Incident deleted" });
  } catch (e) {
    console.log(e.message);
    res.status(404).json({ message: "Incident not found" });
  }
};
