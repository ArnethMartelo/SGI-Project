const express = require("express");
const router = express.Router();
const incident = require("../controllers/incident.controller");
const auth = require("../middlewares/auth")

//Get all incidents
router.get("/incident", auth.verifyToken, incident.list);

//Search incident
router.get("/incident/:id", auth.verifyToken, incident.search);

//create incident
router.post("/incident", auth.verifyToken, incident.create);

//Update incident
router.put("/incident/:id", auth.verifyToken, auth.verifyAdmin, incident.update);

//Delete incident
router.delete("/incident/:id", auth.verifyToken, auth.verifyAdmin, incident.delete);

module.exports = router;
