const express = require("express");
const router = express.Router();
const {
  login,
  register,
  forgotPassword,
  resetPassword,
  dashboard,
} = require("../controllers/UserController");
const auth = require("../middlewares/auth");

router.get("/", auth, dashboard);
router.post("/register", register);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.put("/passwordreset/:resetToken", resetPassword);

module.exports = router;
