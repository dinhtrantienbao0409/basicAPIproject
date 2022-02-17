var express = require("express");
const { render } = require("express/lib/response");
var router = express.Router();
const User = require("../models/User");
const bcript = require("bcrypt");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/register", function (req, res) {
  res.render("register");
});

router.post("/register", async function (req, res) {
  const { name, email, password } = req.body;
  const hashedPassword = await bcript.hash(password, 10);

  const data = {
    name,
    email,
    password: hashedPassword,
  };

  try {
    const user = await User.create(data);

    if (user) {
      res.redirect("/login");
    }
  } catch (error) {
    console.log("🚀 ~ file: index.js ~ line 31 ~ error", error);
    next(error);
  }
});

router.get("/login", function (req, res) {
  res.render("login");
});

router.post("/login", async function (req, res) {
  try {
    const { email, password } = req.body;

    //check if email and password is empty.
    if (!email || !password) {
      return res.redirect("/login");
    }

    //check if email does not match with users in database.
    const userData = await User.findOne({ email });
    if (!userData) {
      return res.redirect("/login");
    }

    userData.checkPassword(password, function (err, result) {
      if (err) {
        return res.redirect("/login");
      }
      if (!result) {
        return res.redirect("/login");
      }
      return res.send("Login successfully.");
    });
  } catch (error) {
    console.log("🚀 ~ file: index.js ~ line 46 ~ error", error);
    return res.redirect("/login");
  }
});
module.exports = router;
