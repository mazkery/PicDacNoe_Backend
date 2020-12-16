const passport = require("./passport");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  passport.authenticate("local-signup", (error, user, info) => {
    if (error || !user) {
      return res.status(500).json({
        message: info || "Signup Error",
      });
    }
    const token = generateAccessToken({
      user: { id: user._id },
    });
    res.header({ token: token });
    return res.json({
      info,
      user: {
        id: user._id,
        username: user.username,
        token,
      },
    });
  })(req, res, next);
};

exports.signin = (req, res, next) =>
  passport.authenticate("local-signin", (error, user, info) => {
    if (error || !user) {
      return res.status(500).json({
        message: info || "Signin Error",
      });
    }
    const token = generateAccessToken({
      user: { id: user._id },
    });
    res.header({ token: token });
    return res.json({
      info,
      user: {
        id: user._id,
        username: user.username,
        token,
      },
    });
  })(req, res, next);

exports.googleAuth = (req, res, next) => {
  passport.authenticate("google-login", (error, user, info) => {
    if (error || !user) {
      return res.status(500).json({
        message: info || "Google Auth Error",
      });
    }
    const token = generateAccessToken({
      user: { id: user._id },
    });
    res.header({ token: token });
    return res.json({
      info,
      user: {
        id: user._id,
        username: user.username,
        token,
      },
    });
  })(req, res, next);
};

exports.facebookAuth = (req, res, next) => {
  passport.authenticate("facebook-login", (error, user, info) => {
    if (error || !user) {
      return res.status(500).json({
        message: info || "Facebook Auth Error",
      });
    }
    const token = generateAccessToken({
      user: { id: user._id },
    });
    res.header({ token: token });
    return res.json({
      info,
      user: {
        id: user._id,
        username: user.username,
        token,
      },
    });
  })(req, res, next);
};

function generateAccessToken(data) {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1h" });
}
