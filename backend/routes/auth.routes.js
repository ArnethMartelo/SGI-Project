const router = require("express").Router();
const auth = require("../controllers/auth.controller");

//Login user
router.post("/signin", auth.signin);

module.exports = router;
