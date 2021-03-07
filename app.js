const path = require("path");
const express = require("express");
const morgan = require("morgan");
const rate_limiter = require("express-rate-limit");
const helmet = require("helmet");
const mongo_sanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const bookRouter = require("./routes/bookRouter");
const user_router = require("./routes/userRouter");
const view_router = require("./routes/viewRouter");

const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}
app.use(helmet());
app.use(morgan("dev"));
const limiter = rate_limiter({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "too many requests, please try again in an hour",
});
app.use("/api", limiter);
//remove any $ operator
app.use(mongo_sanitize());
//remove any html tags
app.use(xss());
//prevent parameter pollution
app.use(
  hpp({
    whitelist: ["duration"],
  })
);
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.use("/", view_router);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/users", user_router);
module.exports = app;
