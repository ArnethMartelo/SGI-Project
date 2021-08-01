const jwt = require("jsonwebtoken");
const { secret } = require("../../config.json");
const User = require("../models/employee.model");

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "No token provided" });
    const decoded = jwt.verify(token, secret);
    req.userId = decoded.user.id;
    const user = await User.findById(req.userId, { password: 0 });
    if (!user) return res.status(404).json({ message: "User not found" });
    next();
  } catch (e) {
    res.status(500).send({ message: "Invalid Token" });
  }
};
exports.verifyAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId, { password: 0 });
    if (user.role === "admin") {
      next();
    } else {
      return res.status(401).json({ message: "Requires admin permissions" });
    }
  } catch (e) {
    res.status(401).send({ message: "Ups... something has gone wrong " });
  }
};
