require("dotenv").config();
// async errors
require("express-async-errors");

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");

const authenticateUser = require("./middlewares/authentication");
// middleware
const mainRouter = require("./routes/main");

const authRouter = require("./routes/auth");
const jobRouter = require("./routes/jobs");

const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error-handler");

app.use(express.json());
app.use(express.static("./public"));

// security middle
app.use(helmet());
app.use(cors());
app.use(xss());

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

//route
app.use("/api/v1", mainRouter);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/job", authenticateUser, jobRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 4200;

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (err) {
    console.error(err);
  }
};

start();
