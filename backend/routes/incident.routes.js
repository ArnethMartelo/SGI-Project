const express = require("express");
const router = express.Router();
const incident = require("../controllers/incident.controller");

//create incident
router.post("/incident", incident.create);

//Get all incidents
router.get("/incident", incident.list);

//Search incident
router.get("/incident/:id", incident.search);

//Update incident
router.put("/incident/:id", incident.update);

//Delete incident
router.delete("/incident/:id", incident.delete);

module.exports = router;
