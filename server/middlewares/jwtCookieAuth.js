const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtCookieAuth = (req, res, next) => {
  const token = req.cookies.jwt_auth;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized, No token found" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      res.clearCookie("jwt_auth");
      return res
        .status(403)
        .json({ message: "Forbidden, JWT couldn't verify token" });
    }

    req.user = user.username;
    next();
  });
};

module.exports = jwtCookieAuth;
