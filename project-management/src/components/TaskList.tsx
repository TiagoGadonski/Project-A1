import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask as addTaskApi, updateTask as updateTaskApi, deleteTask as deleteTaskApi } from '../api/project';
import { addTask, updateTask, deleteTask } from '../store/projectSlice';
import { TextField, Button, Container, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Checkbox, Box, Typography, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  completed: boolean;
}

interface TaskListProps {
  projectId: string;
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ projectId, tasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const dispatch = useDispatch();

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const task = { title, description, assignedTo, completed: false };
    addTaskApi(projectId, task).then(response => dispatch(addTask({ projectId, task: response.data })));
    setTitle('');
    setDescription('');
    setAssignedTo('');
  };

  const handleToggleCompleted = (task: Task) => {
    const updatedTask = { ...task, completed: !task.completed };
    updateTaskApi(projectId, task.id, updatedTask).then(() => dispatch(updateTask({ projectId, task: updatedTask })));
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTaskApi(projectId, taskId).then(() => dispatch(deleteTask({ projectId, taskId })));
  };

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Tasks
      </Typography>
      <Box component="form" onSubmit={handleAddTask} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
        <TextField
          label="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          multiline
          rows={2}
        />
        <TextField
          label="Assigned To"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Task
        </Button>
      </Box>
      <List>
        {tasks.map(task => (
          <React.Fragment key={task.id}>
            <ListItem>
              <Checkbox
                checked={task.completed}
                onChange={() => handleToggleCompleted(task)}
              />
              <ListItemText
                primary={task.title}
                secondary={`${task.description} (Assigned to: ${task.assignedTo})`}
                style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
};

export default TaskList;
