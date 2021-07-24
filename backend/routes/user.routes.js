const router = require('express').Router();
const Users = require("../controllers/user.controller");
const User = require('../models/user.model.js')
const  {check}  = require("express-validator");
const auth = require('../middlewares/auth')


  router.post(
    "/signup",
    [
      check("name", "Please Enter a Valid Username").not().isEmpty(),
      check("email", "Please enter a valid email").isEmail(),
      check("password", "Please enter a valid password").isLength({
        min: 8,
      }),
    ],
    Users.createUser
  );
  router.post(
    "/signin",
    [
      check("email", "Please enter a valid email").isEmail(),
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

