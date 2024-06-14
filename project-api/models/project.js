const mongoose = require('mongoose');
const taskSchema = require('./task');

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  tasks: [taskSchema],
  collaborators: [String],
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
