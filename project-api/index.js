const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/projects', { useNewUrlParser: true, useUnifiedTopology: true });

const projectRoutes = require('./routes/projectRoutes');
app.use('/projects', projectRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
