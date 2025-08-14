import { useEffect, useState } from "react";
import Task from "../components/Task";
import { showToaste } from "../helper/showToaste";

const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getTask = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/task/get-all-task`);
        const responseData = await res.json();
        if (responseData.success) {
          setTasks(responseData.taskData || []);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    getTask();
  }, [refresh]);

  const deleteTask = async (taskId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/task/delete-task/${taskId}`, {
        method: "DELETE",
      });
      const responseData = await res.json();
      if (!res.ok) {
        throw new Error(responseData.message);
      }

      setRefresh((prev) => !prev);  // toggle refresh
      showToaste("success", "Delete task successfully");
    } catch (error) {
      showToaste("error", error.message);
    }
  };


  return (
    <div className="pt-5">
      <h1 className="text-2xl font-bold mb-5">My Tasks</h1>

      {loading ? (
        <>Loading...</>
      ) : tasks.length > 0 ? (
        tasks.map((task) => <Task props={task} key={task._id} onDelete={deleteTask} />)
      ) : (
        <>No tasks found.</>
      )}
    </div>
  );
};

export default TaskListPage;
