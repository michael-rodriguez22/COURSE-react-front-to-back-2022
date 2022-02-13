const router = require("express").Router(),
  userRoutes = require("./user-routes"),
  ticketAndNoteRoutes = require("./ticket-and-note-routes")

router.use("/users", userRoutes)
router.use("/tickets", ticketAndNoteRoutes)

module.exports = router
