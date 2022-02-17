const jwt = require("jsonwebtoken");
require("dotenv").config();

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) res.status(400).send("User must login");

    const payload = await jwt.verify(token, process.env.SECRET_KEY);
    req.user = payload;
    next();
  } catch (error) {
    console.log("🚀 ~ file: auth.js ~ line 14 ~ isLoggedIn ~ error", error);
    next(error);
  }
};

module.exports = {
  isLoggedIn,
};
