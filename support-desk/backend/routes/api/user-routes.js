const router = require("express").Router()
const { protect } = require("../../middleware")
const {
  registerUser,
  loginUser,
  getMe,
} = require("../../controllers/user-controller")

router.post("/", registerUser)
router.post("/login", loginUser)
router.get("/me", protect, getMe)

module.exports = router
