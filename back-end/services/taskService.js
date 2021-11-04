const { ObjectId } = require('mongodb');
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
};

const removeTaskService = async ({ id }) => {
  if (!ObjectId.isValid(id)) {
    return false;
  } 
  const task = await model.removeTask({ id });
  if (task === false) {
    return false;
  }
  return true;
};

const updateTaskService = async ({ id, title, created, status }) => {
  if (!ObjectId.isValid(id)) {
    return false;
  } 
  const task = await model.updateTask({ id, title, created, status });
  if (task === false) {
    return false;
  }
  return task;
};

module.exports = {
  getAllService,
  createTaskService,
  removeTaskService,
  updateTaskService,
};
