const router = require("express").Router();
const Users = require("../controllers/user.controller");


//get all users
router.get("/users", Users.getAllUsers);

//create new user
router.post("/signup", Users.createUser);

//edit user
router.put("/user/:id", Users.editUser);

//Delete user
router.delete("/user/:id", Users.deleteUser);

//Login user
router.post("/signin", Users.loginUser);


module.exports = router;
