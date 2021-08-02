const User = require("../models/employee.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { secret } = require("../../config.json");

//Signin user
exports.signin = async (req, res) => {
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
        id: user._id,
      },
    };

    jwt.sign(
      payload,
      secret,
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
