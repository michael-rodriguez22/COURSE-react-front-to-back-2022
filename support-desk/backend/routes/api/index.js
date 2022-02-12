const router = require("express").Router(),
  userRoutes = require("./user-routes")

router.use("/users", userRoutes)

module.exports = router
