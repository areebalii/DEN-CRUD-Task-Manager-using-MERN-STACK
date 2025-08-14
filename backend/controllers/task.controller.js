import TaskModel from "../models/task.model.js";

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body
    const newTask = new TaskModel({
      title, description
    })
    await newTask.save()

    res.status(201).json({
      success: true,
      message: "Task created successfully",
    })

  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Failed to create task",
    })
  }
};
export const getAllTasks = async (req, res) => {
  try {
    const taskData = await TaskModel.find().sort({ createdAt: -1 }).lean().exec()

    res.status(201).json({
      success: true,
      taskData,
    })

  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to create task",
    })
  }
};
export const showTask = async (req, res) => {
  try {
    const { taskid } = req.params
    const taskData = await TaskModel.findById(taskid).lean().exec()

    res.status(201).json({
      status: true,
      taskData,
    })

  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to create task",
    })
  }
};
export const updateTask = async (req, res) => {
  try {
    const { taskid } = req.params
    const { title, description, status } = req.body
    const taskData = await TaskModel.findByIdAndUpdate(taskid, { title, description, status }, { new: true })

    res.status(201).json({
      status: true,
      message: "Task updated successfully",
      taskData
    })

  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to update task",
    })
  }
};
export const deleteTask = async (req, res) => {
  try {
    const { taskid } = req.params
    await TaskModel.findByIdAndDelete(taskid)

    res.status(201).json({
      success: true,
      message: "Task deleted successfully",
    })

  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to update task",
    })
  }
};