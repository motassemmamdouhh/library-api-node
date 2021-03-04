const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("./models/userModel");
const { abort } = require("./abort");

const generate_token = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

exports.signup = async (req, res, next) => {
  try {
    const new_user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password_confirm: req.body.password_confirm,
    });
    const token = generate_token(new_user.id);
    res.status(201).json({
      stauts: "success",
      message: "user created",
      jwt_token: token,
      data: {
        new_user,
      },
    });
  } catch (err) {
    abort(res, 400, "please check your sent data");
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      abort(res, 400, "email or password are not provided");
    }
    const user = await User.findOne({ email: email }).select("+password");
    if (!user || !(await user.check_password(password, user.password))) {
      abort(res, 401, "Unauthorized, wrong email or password");
    }
    const token = generate_token(user.id);
    res.status(200).json({
      status: "success",
      token: token,
    });
  } catch (err) {
    abort(res, 500);
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else {
      abort(res, 401, "please pass the JWT in the authorization header");
    }

    try {
      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );
      const user = await User.findById(decoded.id);
      if (!user) abort(res, 401, "unauthorized");
      req.user = user;
    } catch (err) {
      abort(res, 500);
    }
    next();
  } catch (err) {
    abort(res, 500);
  }
};

exports.check_permission = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      abort(res, 403, "Forbidden,you dont have access to this route");
    }
    next();
  };
};
