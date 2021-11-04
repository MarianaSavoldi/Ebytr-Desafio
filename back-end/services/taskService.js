const model = require('../models/taskModel');

const getAllService = async () => {
  const tasks = await model.getAll();
  if (tasks.length === 0) {
    return { message: 'All tasks are done!' };
  }
  return { tasks };
};

const createTaskService = async ({ title, created, status }) => {
  const task = await model.createTask({ title, created, status });
  return task;
}

module.exports = {
  getAllService,
  createTaskService,
};
