// src/store/projectSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  completed: boolean;
}

interface Project {
  id: string;
  name: string;
  description: string;
  tasks: Task[];
  collaborators: string[];
}

interface ProjectState {
  projects: Project[];
}

const initialState: ProjectState = {
  projects: [],
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects(state, action: PayloadAction<Project[]>) {
      state.projects = action.payload;
    },
    addProject(state, action: PayloadAction<Project>) {
      state.projects.push(action.payload);
    },
    updateProject(state, action: PayloadAction<Project>) {
      const index = state.projects.findIndex(project => project.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },
    deleteProject(state, action: PayloadAction<string>) {
      state.projects = state.projects.filter(project => project.id !== action.payload);
    },
    addTask(state, action: PayloadAction<{ projectId: string; task: Task }>) {
      const project = state.projects.find(p => p.id === action.payload.projectId);
      if (project) {
        project.tasks.push(action.payload.task);
      }
    },
    updateTask(state, action: PayloadAction<{ projectId: string; task: Task }>) {
      const project = state.projects.find(p => p.id === action.payload.projectId);
      if (project) {
        const taskIndex = project.tasks.findIndex(t => t.id === action.payload.task.id);
        if (taskIndex !== -1) {
          project.tasks[taskIndex] = action.payload.task;
        }
      }
    },
    deleteTask(state, action: PayloadAction<{ projectId: string; taskId: string }>) {
      const project = state.projects.find(p => p.id === action.payload.projectId);
      if (project) {
        project.tasks = project.tasks.filter(task => task.id !== action.payload.taskId);
      }
    },
  },
});

export const { setProjects, addProject, updateProject, deleteProject, addTask, updateTask, deleteTask } = projectSlice.actions;
export default projectSlice.reducer;
