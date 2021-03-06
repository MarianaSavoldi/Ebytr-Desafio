const { StatusCodes } = require('http-status-codes');
const { Router } = require('express');
const service = require('../services/taskService');
const { validTitle, validCreated, validStatus } = require('../middlewares/taskVallidations');


const route = Router();
const errorMessage = 'Sorry! There is something wrong!';

route.get('/', async (_req, res) => {
  try {
    const tasks = await service.getAllService();
    if (tasks.message) {
      return res.status(StatusCodes.OK).json({ message: tasks.message });
    }
    return res.status(StatusCodes.OK).json(tasks);
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(errorMessage);
  }
});

route.post('/post', validTitle, validCreated, validStatus, async (req, res) => {
  try {
    const { title, created, status } = req.body;
    const task = await service.createTaskService({ title, created, status });
    return res.status(StatusCodes.CREATED).json(task);
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(errorMessage);
  }
});

route.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await service.removeTaskService({ id });
    if (deletedTask === false) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ message: 'Task not found'});
    }
    return res.status(StatusCodes.OK).json({ message: 'Task deleted successfully!'});
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(errorMessage);
  }
});

route.put('/:id', validTitle, validCreated, validStatus, async (req, res) => {
  try {
    const { id } = req.params;
  const { title, created, status } = req.body;
  const updatedTask = await service.updateTaskService({ id, title, created, status });
  if (updatedTask === false) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ message: 'Task not found'});
  }
  return res.status(StatusCodes.OK).json(updatedTask);
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(errorMessage);
  }
});

module.exports = route;
