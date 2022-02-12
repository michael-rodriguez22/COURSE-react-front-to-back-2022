const mongoose = require("mongoose")

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    product: {
      type: "String",
      required: [true, "Please select a product"],
      enum: [
        "iPhone",
        "Samsung Galaxy",
        "Google Pixel",
        "iPad",
        "Macbook",
        "Windows Laptop",
        "Windows Desktop",
      ],
    },

    description: {
      type: "String",
      required: [true, "Please enter a description of your issue"],
    },

    status: {
      type: "String",
      required: true,
      enum: ["new", "open", "closed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
)

const Ticket = mongoose.model("Ticket", ticketSchema)

module.exports = Ticket
