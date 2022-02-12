const router = require("express").Router(),
  userRoutes = require("./user-routes"),
  ticketRoutes = require("./ticket-routes")

router.use("/users", userRoutes)
router.use("/tickets", ticketRoutes)

module.exports = router
