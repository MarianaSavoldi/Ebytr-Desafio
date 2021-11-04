const { connection } = require('./connection');

const getAll = async () => {
  const db = await connection();
  const tasks = await db.collection('tasks').find({}).sort({
    'title': 1,
    'created': 1,
    'status': 1,
  }).toArray();
  return tasks;
};

const createTask = async ({ title, created, status }) => {
  const db = await connection();
  const task = await db.collection('tasks').insertOne({ title, created, status });
  return {
    _id: task.insertedId,
    title,
    created,
    status,
  };
} 

module.exports = {
  getAll,
  createTask,
};