const express = require('express');
const Project = require('../models/project');

const router = express.Router();

router.get('/', async (req, res) => {
  const projects = await Project.find();
  res.send(projects);
});

router.post('/', async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.send(project);
});

router.patch('/:id', async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(project);
});

router.delete('/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.send({ message: 'Project deleted' });
});

router.patch('/:id/tasks', async (req, res) => {
  const project = await Project.findById(req.params.id);
  project.tasks.push(req.body);
  await project.save();
  res.send(project);
});

router.patch('/:id/tasks/:taskId', async (req, res) => {
  const project = await Project.findById(req.params.id);
  const task = project.tasks.id(req.params.taskId);
  Object.assign(task, req.body);
  await project.save();
  res.send(project);
});

router.delete('/:id/tasks/:taskId', async (req, res) => {
  const project = await Project.findById(req.params.id);
  project.tasks.id(req.params.taskId).remove();
  await project.save();
  res.send(project);
});

module.exports = router;
