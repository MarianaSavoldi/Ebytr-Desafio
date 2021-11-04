const { connection } = require('./connection');

const getAll = async () => {
  console.log('model');
  const db = await connection();
  const tasks = await db.collection('tasks').find().toArray();
  return tasks;
};

module.exports = {
  getAll,
};