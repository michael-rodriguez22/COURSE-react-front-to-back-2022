const router = require("express").Router(),
  { registerUser, loginUser } = require("../../controllers/user-controller")

router.post("/", registerUser)
router.post("/login", loginUser)

module.exports = router
