const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const _ = require("underscore");

//Create user
exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const {
    name,
    lastName,
    idType,
    idNumber,
    phoneNumber,
    address,
    position,
    status,
    img,
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
      status,
      img,
      email,
      password,
      role,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      "randomString",
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

//Get all users
exports.list = async (req, res) => {
  try {
    let from = req.query.from || 0;
    from = Number(from);

    let limit = req.query.limit || 5;
    limit = Number(limit);

    const conditions = {
      status: true,
    };

    const users = await User.find(
      conditions,
      "name lastName email position role status"
    )
      .skip(from)
      .limit(limit);

    const sumUsers = await User.countDocuments(conditions);
    res.status(200).json({ users, sumUsers });
  } catch (e) {
    console.log(e.message);
    res.status(400).send("Error listing users");
  }
};

//Search user
exports.search = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    res.status(200).json({
      message: "User found",
      user,
    });
  } catch (e) {
    console.log(e.message);
    res.status(404).json({ message: "user not found" });
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
      "img",
      "status",
    ]);
    const userBD = await User.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true,
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
    res.status(200).json({ userBD });
  } catch (e) {
    console.log(e.message);
    res.status(400).send("Error deleting user");
  }
};

//Login user
exports.login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      email,
    });

    if (!user)
      return res.status(400).json({
        message: "User Not Exist",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        message: "Incorrect Password !",
      });

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      "randomString",
      {
        expiresIn: 3600,
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token: token,
          role: user.role,
        });
      }
    );
  } catch (e) {
    console.error(e.message);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
