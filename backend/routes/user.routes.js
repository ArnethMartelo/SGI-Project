const router = require("express").Router();
const user = require("../controllers/user.controller");
const auth = require("../middlewares/auth");

//Get all users
router.get("/user", auth.verifyToken, auth.verifyAdmin, user.list);

//Search user
router.get("/user/:id", auth.verifyToken, user.search);

//Create user
router.post("/user", auth.verifyToken, auth.verifyAdmin, user.create);

//Update user
router.put("/user/:id", auth.verifyToken, auth.verifyAdmin, user.update);

//Delete user
router.delete("/user/:id", auth.verifyToken, auth.verifyAdmin, user.delete);

module.exports = router;
