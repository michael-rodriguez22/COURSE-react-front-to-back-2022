const router = require("express").Router()
const { protect } = require("../../middleware")
const {
  getAllTickets,
  getSingleTicket,
  createTicket,
  updateTicket,
  deleteTicket,
} = require("../../controllers/ticket-controller")

router.route("/").get(protect, getAllTickets).post(protect, createTicket)

router
  .route("/:id")
  .get(protect, getSingleTicket)
  .put(protect, updateTicket)
  .delete(protect, deleteTicket)

module.exports = router
