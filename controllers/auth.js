const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.getName(), email: user.getEmail() }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("PLease provide email and password");
  }
  const user = await User.findOne({ email });

  // compare user
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials - email");
  }

  // comapare password
  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) {
    throw new UnauthenticatedError("Invalid Credentials - password");
  }

  const token = user.createJWT();

  res
    .status(StatusCodes.OK)
    .json({ user: { name: user.name, email: user.getEmail() }, token });
};

module.exports = {
  register,
  login,
};
