import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
  origin: process.env.FRONTEND_URL,
}))

mongoose.connect(process.env.MONGODB_CONN).then(() => {
  console.log("Connected to MongoDB")
}).catch((err) => {
  console.log(err)
})

const PORT = process.env.PORT || 5000


app.listen(PORT, () => {
  console.log(`Server running on  https://localhost:${PORT}`)
})