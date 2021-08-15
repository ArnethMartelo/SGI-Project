const User = require("../models/employee.model");
const { secret } = require("../../config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const _ = require("underscore");

//Get all users
exports.list = async (req, res) => {
  try {
    let from = req.query.from || 0;
    from = Number(from);

    let limit = req.query.limit || 5000;
    limit = Number(limit);

    const conditions = {
      status: true,
    };
    const users = await User.find(conditions, User).skip(from).limit(limit);
    res.status(200).json(users);
  } catch (e) {
    console.log(e.message);
    res.status(400).send("Error listing users");
  }
};

//Search user
exports.search = async (req, res) => {
  try {
    const user = await User.findOne({ idNumber: req.params.id });
    //console.log(user);
    res.status(200).send(user);
  } catch (e) {
    console.log(e.message);
    res.status(404).json({ message: "user not found" });
  }
};

//Create user
exports.create = async (req, res) => {
  const {
    name,
    lastName,
    idType,
    idNumber,
    phoneNumber,
    address,
    position,
    email,
    password,
    role,
  } = req.body;
  try {
    let user = await User.findOne({
      email,
    });
    if (user) {
      return res.status(400).json({
        msg: "User Already Exists",
      });
    }
    user = new User({
      name,
      lastName,
      idType,
      idNumber,
      phoneNumber,
      address,
      position,
      email,
      password,
      role,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user._id,
      },
    };
    jwt.sign(
      payload,
      secret,
      {
        expiresIn: 10000,
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token,
        });
      }
    );
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Error in Saving");
  }
};

//Update user
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const user = _.pick(req.body, [
      "name",
      "lastName",
      "idType",
      "idNumber",
      "address",
      "phoneNumber",
      "position",
      "password",
      "role",
      "email",
    ]);

    const userBD = await User.findByIdAndUpdate(id, user, {
      new: true,
      //runValidators: true,
    });
    res.status(200).json({ userBD });
  } catch (e) {
    console.log(e.message);
    res.status(400).send("Error updating user");
  }
};

//Delete user
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const userBD = await User.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );
    if (!userBD) {
      res.status(400).json({
        message: "User not found",
      });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (e) {
    console.log(e.message);
    res.status(400).send("Error deleting user");
  }
};
