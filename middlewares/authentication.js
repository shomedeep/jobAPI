const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("No token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // const { id, username } = payload;
    // attach the user to the job routes
    req.user = { userId: payload.userId, name: payload.name };

    next();
  } catch (err) {
    console.error(err);
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = auth;
