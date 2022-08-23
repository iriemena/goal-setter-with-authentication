const { join } = require("path");
const express = require("express");
const morgan = require("morgan");
const color = require("colors");
const path = require("path");
// const {errorHandler} = require('./middleware/errorMiddleware')
const dotenv = require("dotenv").config({
  path: join(__dirname, "..", ".env"),
});
const connectDB = require("../backend/config/db");
const port = process.env.PORT || 8000;
const app = express();

connectDB();

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// router
app.use("/api/goal", require("./routes/goalRoute"));
app.use("/api/user", require("./routes/userRoute"));

app.use(morgan("dev"));

// overriding inbuit error handler
// use
// app.use(errorHandler)
// OR
app.use((err, req, res, next) => {
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
  next();
});

// **********************************************************************
app.listen(port, () => console.log(`app listening on ${port}`));
