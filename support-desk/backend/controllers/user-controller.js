const asyncHandler = require("express-async-handler")
// @desc    Register a new user
// @route   /api/users
// @access  Public
const registerUser = asyncHandler(async ({ body }, res) => {
  const { name, email, password } = body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error("Please include all fields")
  }

  res.json({ name, email })
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
