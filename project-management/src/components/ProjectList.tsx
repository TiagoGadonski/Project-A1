import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setProjects, deleteProject } from '../store/projectSlice';
import { getProjects, deleteProject as deleteProjectApi } from '../api/project';
import ProjectForm from './ProjectForm';
import TaskList from './TaskList';
import { Container, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ProjectList: React.FC = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.projects.projects);

  useEffect(() => {
    getProjects().then(response => dispatch(setProjects(response.data)));
  }, [dispatch]);

  const handleDelete = (id: string) => {
    deleteProjectApi(id).then(() => dispatch(deleteProject(id)));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Project List
      </Typography>
      <ProjectForm />
      <List>
        {projects.map(project => (
          <React.Fragment key={project.id}>
            <ListItem>
              <ListItemText primary={project.name} secondary={project.description} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(project.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <TaskList projectId={project.id} tasks={project.tasks} />
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
};

export default ProjectList;
