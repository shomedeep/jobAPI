require("dotenv").config();
// async errors
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");

// middleware
const mainRouter = require("./routes/main");

const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error-handler");

app.use(express.json());
app.use(express.static("./public"));

//route
app.use("/api/v1", mainRouter);

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
    console.log(err);
  }
};

start();
