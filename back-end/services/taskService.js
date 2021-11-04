const model = require('../models/taskModel');

const getAllService = async () => {
  const tasks = await model.getAll();
  if (tasks.length === 0) {
    return { message: 'All tasks are done!' };
  }
  return { tasks };
};

module.exports = {
  getAllService,
};
