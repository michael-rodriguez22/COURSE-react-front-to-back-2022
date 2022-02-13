require("colors")
require("dotenv").config()
const path = require("path")
const express = require("express")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(require("./routes"))

// Serve Frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")))

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../", "frontend", "build", "index.html"))
  })
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the Support Desk API" })
  })
}

const { errorHandler } = require("./middleware")
app.use(errorHandler)

const { PORT = 5000 } = process.env
const connectDB = require("./config/connection")

app.listen(PORT, () => {
  console.log(`\nServer started on port ${PORT}`.brightCyan.bold)
  connectDB()
})
