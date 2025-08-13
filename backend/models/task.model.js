import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
    enum: ["pending", "in-progress", "completed", "failed"],
  },
}, { timestamps: true });

const TaskModel = new mongoose.model("Task", taskSchema, "tasks");
export default TaskModel;
