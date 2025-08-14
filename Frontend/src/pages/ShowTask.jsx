import React, { useEffect, useState } from "react";
import z, { ZodError } from "zod";
import { getZodError } from "../helper/getZodError";
import { showToaste } from "../helper/showToaste"
import { useParams } from "react-router-dom";

const ShowTask = () => {
  const [apiData, setApiData] = useState();
  const [formData, setFormData] = useState({});
  const [err, setError] = useState({});
  const { taskid } = useParams();
  const [loading, setLoading] = useState(true);


  const taskSchema = z.object({
    title: z
      .string()
      .min(3, { message: "Title must be at least 3 characters long." }),
    description: z
      .string()
      .min(3, { message: "Description must be at least 3 characters long." })
      .max(500, { message: "Length exceeded." }),
    status: z.enum(["pending", "in-progress", "completed", "failed"]),
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for the specific field as user types
    if (err[name]) {
      setError((prev) => ({ ...prev, [name]: "" }));
    }
  };

  useEffect(() => {
    const getTask = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/task/show-task/${taskid}`);
        const responseData = await res.json();
        setApiData(responseData);
        setFormData(responseData.taskData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    getTask();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({}); // clear previous errors

    try {
      const validatedData = taskSchema.parse(formData);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/task/update-task/${taskid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      });

      const responseData = await response.json();
      console.log(responseData);

      if (!response.ok) {
        showToaste("error", responseData.message);
      }

      showToaste("success", responseData.message);
      // showToast("success", responseData.message);
    } catch (error) {
      if (error instanceof ZodError) {
        const getErrorObj = getZodError(error.issues);
        setError(getErrorObj);
      } else {
        // showToast("error", error.message);
        console.error(error.message);
      }
    }
  };

  return (
    <div className="pt-5">
      <h1 className="text-2xl font-bold mb-5">Task Details</h1>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Title
          </label>
          <input
            value={formData.title || ""}
            onChange={handleInput}
            name="title"
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Task title"
          />
          {err.title && (
            <span className="text-red-500 text-sm">{err.title}</span>
          )}
        </div>

        {/* Description */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Description
          </label>
          <textarea
            value={formData.description || ""}
            onChange={handleInput}
            name="description"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 
            rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Task description..."
          ></textarea>
          {err.description && (
            <span className="text-red-500 text-sm">{err.description}</span>
          )}
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Description
          </label>
          <select defaultValue={formData.status || ""} onChange={handleInput} name="status"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 
            rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
          {err.status && (
            <span className="text-red-500 text-sm">{err.status}</span>
          )}
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
          focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm 
          w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Update Task
        </button>
      </form>
    </div>
  )
}

export default ShowTask