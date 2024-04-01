const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const login = async (req, res, next) => {
  const { username, password } = req.body;

  // 3 option to validate
  // mongoose validation
  // joi
  // check in the controller

  if (!username || !password) {
    throw new CustomAPIError("Please provide username and password", 400);
  }

  //  just for the demo normally provided by DB!!!
  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res, next) => {
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: ` Hello, ${req?.user?.username || "dummy"}`,
    secret: `Here is your authorized data, you'r lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
