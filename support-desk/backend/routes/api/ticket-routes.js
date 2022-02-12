const router = require("express").Router()
const {
  getAllTickets,
  createTicket,
} = require("../../controllers/ticket-controller")
const { protect } = require("../../middleware")

router.route("/").get(protect, getAllTickets).post(protect, createTicket)

module.exports = router
