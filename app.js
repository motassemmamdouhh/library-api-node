const express = require("express");
const morgan = require("morgan");
const bookRouter = require("./routes/bookRouter");
const user_router = require("./routes/userRouter");
const app = express();
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

app.use(morgan("dev"));

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/books", bookRouter);
app.use("/api/v1/users", user_router);
module.exports = app;
