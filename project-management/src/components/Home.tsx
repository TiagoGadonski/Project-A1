import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Container, Typography, Grid, Card, CardContent, CardHeader } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Home: React.FC = () => {
  const projects = useSelector((state: RootState) => state.projects.projects);
  const [recentProjects, setRecentProjects] = useState(projects.slice(0, 3));

  useEffect(() => {
    setRecentProjects(projects.slice(0, 3));
  }, [projects]);

  const completedTasks = projects.reduce((sum, project) => sum + project.tasks.filter(task => task.completed).length, 0);
  const totalTasks = projects.reduce((sum, project) => sum + project.tasks.length, 0);
  const tasksData = [
    { name: 'Completed', value: completedTasks },
    { name: 'Pending', value: totalTasks - completedTasks }
  ];

  const COLORS = ['#0088FE', '#FFBB28'];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to Project Management
      </Typography>
      <Typography variant="body1" paragraph>
        Manage your projects efficiently and effectively with our tool. Below you can find some of the recent projects and an overview of your activity.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardHeader title="Task Overview" />
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={tasksData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                  >
                    {tasksData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <Typography variant="body2">Total Tasks: {totalTasks}</Typography>
              <Typography variant="body2">Completed Tasks: {completedTasks}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <Typography variant="h5" gutterBottom>
            Recent Projects
          </Typography>
          <Grid container spacing={3}>
            {recentProjects.map((project) => (
              <Grid item xs={12} sm={6} key={project.id}>
                <Card>
                  <CardHeader title={project.name} />
                  <CardContent>
                    <Typography variant="body2">{project.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
