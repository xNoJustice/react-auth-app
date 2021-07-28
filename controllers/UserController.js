const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const validateInputs = require("../middlewares/validation");
const sendEmail = require("../utils/sendEmail");

exports.login = async (req, res) => {
  const { errors, isValid } = validateInputs(req.body);
  if (!isValid) {
    return res.status(401).json(errors);
  }
  const { email, password } = req.body;
  try {
    await User.findOne({ email: email }).then(async (user) => {
      if (!user) {
        return res.status(401).json({
          emailnotfound: "User Not Exist",
        });
      }
      await bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return res.status(401).json({
            passwordincorrect: "Email or Password wrong!",
          });
        }

        const token = jwt.sign(
          { id: user._id, name: user.name },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXPIRE,
          }
        );

        res.status(200).json({
          success: true,
          token: "Bearer " + token,
        });
      });
    });
  } catch (err) {
    return res.status(500).json({ emailnotfound: "Server Error" });
  }
};
exports.register = async (req, res) => {
  const { errors, isValid } = validateInputs(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { name, email, password } = req.body;

  try {
    await User.findOne({ email: email }).then(async (user) => {
      if (user) {
        return res.status(400).json({ email: "Email Already Exists" });
      }
      const newUser = new User({
        name: name,
        email: email,
        password: password,
      });

      await newUser
        .save()
        .then((usr) => res.json(usr))
        .catch((err) => console.error(err));
    });
  } catch (err) {
    return res.status(500).json({ email: "Server Error" });
  }
};
exports.forgotPassword = async (req, res) => {
  const { errors, isValid } = validateInputs(req.body);
  if (!isValid && errors.password === null) {
    return res.status(400).json(errors);
  }
  const { email } = req.body;
  try {
    await User.findOne({ email: email }).then(async (user) => {
      if (!user) {
        return res.status(401).json("User Not Exist");
      }
      const resetToken = user.getResetPasswordToken();
      await user.save();
      const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;
      const message = `<h1>You have requested a password reset</h1> <p>Please make a put request to the following link:</p> <a href=${resetUrl} clicktracking=off>${resetUrl}</a>`;

      try {
        await sendEmail({
          to: user.email,
          subject: "Password Reset Request",
          text: message,
        });

        return res.status(200).json({ success: true, data: "Email Sent" });
      } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        return res.status(500).json("Server Error");
      }
    });
  } catch (err) {
    return res.status(400).json({ emailnotfound: "Server Error" });
  }
};
exports.resetPassword = async (req, res) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");
  const { errors, isValid } = validateInputs(req.body);
  if (!isValid && errors.email === null) {
    return res.status(400).json(errors);
  }

  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        password: "Invalid Token",
      });
    }
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );

    return res.status(201).json({
      success: true,
      message: "Password Updated Success",
      token: "Bearer " + token,
    });
  } catch (err) {
    return res.status(500).json({ password: "Server Error" });
  }
};
exports.dashboard = async (req, res) => {
  await User.findById(req.payload.id).then((user) => {
    res.status(200).json({ data: user });
  });
};
