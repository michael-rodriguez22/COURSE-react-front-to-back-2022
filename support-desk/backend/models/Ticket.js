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
      enum: {
        values: [
          "iPhone",
          "Samsung Galaxy",
          "Google Pixel",
          "iPad",
          "Macbook",
          "Windows Laptop",
          "Windows Desktop",
        ],
        message: ({ value }) =>
          `"${value}" is not one of our recognized products`,
      },
    },

    description: {
      type: "String",
      required: [true, "Please enter a description of your issue"],
    },

    status: {
      type: "String",
      required: true,
      enum: {
        values: ["new", "open", "closed"],
        message: ({ value }) =>
          `Invalid status "${value}" (must be new, open, or closed)`,
      },
      default: "new",
    },
  },
  {
    timestamps: true,
  }
)

const Ticket = mongoose.model("Ticket", ticketSchema)

module.exports = Ticket
