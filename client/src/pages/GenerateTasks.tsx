import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setTasks, toggleTaskCompletion } from "../store/slices/TasksSlice";
 
const GenerateTasks: React.FC = () => {
  const [inputData, setInputData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const progress = useSelector((state: RootState) => state.tasks.progress);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (!inputData.trim()) {
      alert("Please enter a task!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/v1/generate-tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic: inputData }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate task");
      }

      const data = await response.json();
      console.log("API Response:", data.tasks);

      // Store tasks in Redux
      dispatch(setTasks(data.tasks));

      setInputData("");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 h-screen w-full flex flex-col items-center p-5">
      <div className="w-1/2 flex flex-col">
        <label htmlFor="taskInput" className="text-white font-roboto">
          Enter your Task Here:
        </label>
        <input
          name="task"
          id="taskInput"
          type="text"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          className="mt-2 p-2 rounded-lg border border-gray-500 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-3 text-white bg-amber-500 rounded-2xl px-4  cursor-pointer hover:scale-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed w-[100%]  "
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {/* Progress Bar */}
      <div className="w-1/2 mt-5">
        <div className="bg-gray-700 rounded-lg h-6 overflow-hidden">
          <div
            className="bg-green-500 h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-white text-center mt-2">{progress}% Completed</p>
      </div>

      {/* Task List with Checkboxes */}
      <div className="w-1/2 mt-5">
        {tasks.length > 0 &&
          tasks.map((task   ) => (
            
            <div className="flex flex-col items-center ">

         
            <div
              key={task?.id}
              className="flex items-center gap-3 text-white font-roboto p-2 rounded-lg border border-gray-500 bg-gray-800 mt-2"
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => dispatch(toggleTaskCompletion(task.id))}
                className="w-5 h-5 cursor-pointer"
              />
              <span className={task.completed ? "line-through text-gray-400" : ""}>
                {task.text}
              </span>
              </div>
              
            </div>
          ))}
      </div>
    </div>
  );
};

export default GenerateTasks;
