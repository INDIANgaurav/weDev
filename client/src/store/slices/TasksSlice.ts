import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
  progress: number;
}

const initialState: TaskState = {
  tasks: [],
  progress: 0,
};

const calculateProgress = (tasks: Task[]) => {
  const completedTasks = tasks.filter((task) => task.completed).length;
  return tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<string[]>) => {
      state.tasks = action.payload.map((task, index) => ({
        id: index,
        text: task,
        completed: false,
      }));
      state.progress = 0;
    },
    toggleTaskCompletion: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
      state.progress = calculateProgress(state.tasks);
    },
  },
});

export const { setTasks, toggleTaskCompletion } = taskSlice.actions;
export default taskSlice.reducer;
