const express = require('express');
const taskController = require('./controllers/taskController');
require('dotenv').config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Welcome to your task list :)');
});

app.use('/task', taskController);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server online on ${PORT}`)
});