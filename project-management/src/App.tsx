import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, Container, Typography } from '@mui/material';
import NavBar from './components/NavBar';
import ProjectList from './components/ProjectList';
import Home from './components/Home';
import About from './components/About';

const App: React.FC = () => {
  return (
    <Router>
      <CssBaseline />
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
