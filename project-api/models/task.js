const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  assignedTo: String,
  completed: Boolean,
});

module.exports = taskSchema;
