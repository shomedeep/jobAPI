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
  console.log(id, "###############", process.env.JWT_SECRET);

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res, next) => {
  //   console.log(req.headers, "header");
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new CustomAPIError("No token provided", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: ` Hello, ${decoded.username}`,
      secret: `Here is your authorized data, you'r lucky number is ${luckyNumber}`,
    });
  } catch (err) {
    throw new CustomAPIError("Not authorized to access this route", 401);
  }
};

module.exports = {
  login,
  dashboard,
};
