const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const { User } = require("../models")

// @desc    Register a new user
// @route   /api/users
// @access  Public
const registerUser = asyncHandler(async ({ body }, res) => {
  const { name, email, password } = body

  // require name, email, password
  if (!name || !email || !password) {
    res.status(400)
    throw new Error("Please include all fields")
  }

  // find if user already exists
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error("User already exists")
  }

  // hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // save to db
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  if (user) {
    return res.status(201).json({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

// @desc    Login a returning user
// @route   /api/users
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  res.send("Login User")
})

module.exports = {
  registerUser,
  loginUser,
}
