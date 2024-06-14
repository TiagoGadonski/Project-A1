import React from 'react';
import { Container, Typography, Avatar, Box, Paper } from '@mui/material';

const About: React.FC = () => {
  return (
    <Container>
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar
            alt="Tiago Gadonski Cordeiro"
            src="https://avatars.githubusercontent.com/u/62782751?v=4" 
            sx={{ width: 120, height: 120, mb: 2 }}
          />
          <Typography variant="h4" gutterBottom>
            About Me
          </Typography>
          <Typography variant="body1" paragraph align="center">
            Hi, I'm Tiago Gadonski Cordeiro, a technology and software development enthusiast with significant experience in .NET, ASP.NET, and various front-end and back-end technologies. 
            I am currently working as an SA IT Operations Trainee and a development intern at Valmet. I have a solid foundation in software engineering from Universidade Positivo and practical experience in web development. 
            I am fluent in Portuguese, advanced in English, and have basic knowledge of French.
          </Typography>
          <Typography variant="body1" paragraph align="center">
            I enjoy creating applications that make people's lives easier and more productive. In my spare time, I like to learn new technologies, work on personal projects, and share my knowledge through videos and tutorials.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default About;
