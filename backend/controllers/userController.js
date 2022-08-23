const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Enter all fields");
  }

  // CHECK IF USER EXIST
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("Email already exists");
  }

  // HASH PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // CREATE A NEW USER
  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      id: user._id,
      name,
      email,
      // token: generateToken(user._id),
      token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "10m",
      }),
    });
  } else {
    res.status(400);
    throw new Error("Something went wrong");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email,
      // token: generateToken(user._id),
      token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "10m",
      }),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credential");
  }
});

// JWT TOKEN GENERATION (SECOND OPTION)
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "2h" });
// };

module.exports = {
  registerUser,
  loginUser,
};
