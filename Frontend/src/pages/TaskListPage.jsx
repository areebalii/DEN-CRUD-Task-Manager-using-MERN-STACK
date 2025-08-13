import { useEffect, useState } from "react";
import Task from "../components/Task";

const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

  return (
    <div className="pt-5">
      <h1 className="text-2xl font-bold mb-5">My Tasks</h1>

      {loading ? (
        <>Loading...</>
      ) : tasks.length > 0 ? (
        tasks.map((task) => <Task props={task} key={task._id} />)
      ) : (
        <>No tasks found.</>
      )}
    </div>
  );
};

export default TaskListPage;
