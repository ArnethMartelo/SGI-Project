const router = require('express').Router();
const Users = require("../controllers/user.controller");
const User = require('../models/user.model.js')
const  {check}  = require("express-validator");
const auth = require('../middlewares/auth')

//get all users
//router.get('/', Users.getAll);

//get one user
//router.get("/:id", Users.getById);

//create new user
//router.post("/", Users.createUser);

//edit user
//router.path("/:id", Users.editUser);

//Delete user
//router.delete("/:id", Users.deleteUser);


  router.post(
    "/signup",
    [
      check("role", "Please Enter a Valid role").not().isEmpty(),
      check("username", "Please enter a valid email").isEmail(),
      check("password", "Please enter a valid password").isLength({
        min: 8,
      }),
    ],
    Users.createUser
  );
  router.post(
    "/signin",
    [
      check("username", "Please enter a valid email").isEmail(),
      check("password", "Please enter a valid password").isLength({
        min: 8,
      }),
    ],
    Users.loginUser
  );

  router.get("/me", auth, async (req, res) => {
    try {
      // request.user is getting fetched from Middleware after token authentication
      const user = await User.findById(req.user.id);
      res.json(user);
    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }
  });

module.exports = router;

