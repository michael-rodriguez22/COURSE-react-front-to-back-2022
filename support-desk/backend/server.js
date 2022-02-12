require("colors")
require("dotenv").config()
const express = require("express")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(require("./routes"))
app.use(require("./middleware/error-handler"))

const { PORT = 5000 } = process.env
const connectDB = require("./config/connection")

app.listen(PORT, () => {
  console.log(`\nServer started on port ${PORT}`.brightCyan.bold)
  connectDB()
})
