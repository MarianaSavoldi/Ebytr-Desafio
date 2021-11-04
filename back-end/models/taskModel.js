const { ObjectId } = require('mongodb');
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
};

const removeTask = async ({ id }) => {
  const db = await connection();
  const findTask = await db.collection('tasks').findOne({_id: ObjectId(id)});
  if (!findTask) {
    return false;
  }
  await db.collection('tasks').deleteOne({ _id: ObjectId(id) });
  return true
};

module.exports = {
  getAll,
  createTask,
  removeTask,
};