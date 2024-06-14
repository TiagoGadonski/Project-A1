// Exemplo no ProjectForm.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProject as addProjectApi } from '../api/project';
import { addProject } from '../store/projectSlice';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

const ProjectForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const project = { name, description };
    addProjectApi(project).then(response => {
      dispatch(addProject(response.data));
      enqueueSnackbar('Project added successfully', { variant: 'success' });
    }).catch(error => {
      enqueueSnackbar('Failed to add project', { variant: 'error' });
    });
    setName('');
    setDescription('');
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Add Project
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          multiline
          rows={4}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Project
        </Button>
      </Box>
    </Container>
  );
};

export default ProjectForm;
