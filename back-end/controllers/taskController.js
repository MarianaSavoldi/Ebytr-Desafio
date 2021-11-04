const { StatusCodes } = require('http-status-codes');
const { Router } = require('express');
const service = require('../services/taskService');

const route = Router();

route.get('/', async (_req, res) => {
  try {
    const tasks = await service.getAllService();
    console.log('Pegou as tasks: ', tasks);
    if (tasks.message) {
      return res.status(StatusCodes.OK).json({ message: tasks.message });
    }
    return res.status(StatusCodes.OK).json(tasks);
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send('Sorry! There is something wrong!');
  }
});

module.exports = route;
