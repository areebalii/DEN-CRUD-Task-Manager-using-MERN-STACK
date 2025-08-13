import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import TaskRouter from "./routes/task.route.js"

dotenv.config()

const app = express()


app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use("/backend/task", TaskRouter)


// Database connection
mongoose.connect(process.env.MONGODB_CONN).then(() => {
  console.log("Connected to MongoDB")
}).catch((err) => {
  console.log(err)
})

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on  https://localhost:${PORT}`)
})