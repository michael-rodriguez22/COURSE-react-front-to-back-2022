const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { User } = require("../models")

// @route   /api/users
// @access  Public
// @method  POST
const registerUser = asyncHandler(async ({ body }, res) => {
  const { name, email, password } = body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error("Please include all fields")
  }

  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error("User already exists")
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  if (user) {
    return res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

// @route   /api/users
// @access  Public
// @method  POST
const loginUser = asyncHandler(async ({ body }, res) => {
  const { email, password } = body

  if (!email || !password) {
    res.status(404)
    throw new Error("Please include an email and password")
  }

  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    return res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error("Invalid login credentials")
  }
})

// @route   /api/users/me
// @access  Private
// @method  GET
const getMe = asyncHandler(async ({ user }, res) => {
  const body = {
    id: user._id,
    name: user.name,
    email: user.email,
  }
  return res.json(body)
})

const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
}
module.exports = {
  registerUser,
  loginUser,
  getMe,
}
