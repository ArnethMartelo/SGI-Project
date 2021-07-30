const router = require("express").Router();
const user = require("../controllers/user.controller");

//create user
router.post("/signup", user.create);

//Get all users
router.get("/user", user.list);

//Search user
router.get("/user/:id", user.search);

//Update user
router.put("/user/:id", user.update);

//Delete user
router.delete("/user/:id", user.delete);

//Login user
router.post("/signin", user.login);

module.exports = router;
