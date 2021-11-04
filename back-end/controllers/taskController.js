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
})

module.exports = route;
