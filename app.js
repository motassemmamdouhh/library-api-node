const express = require("express");
const morgan = require("morgan");
const bookRouter = require("./routes/bookRouter");
const app = express();
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/books", bookRouter);

module.exports = app;
