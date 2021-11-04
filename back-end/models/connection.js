require('dotenv').config();
const { MongoClient } = require('mongodb');

const OPTION = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_DB_URL = process.env.DB_URL || 'mongodb://mongodb:27017/Ebytr';
const MONGO_DB_NAME = process.env.DB_NAME || 'Ebytr';

const connection = async () =>
  MongoClient
    .connect(MONGO_DB_URL, OPTION)
    .then((conn) => conn.db(MONGO_DB_NAME))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

module.exports = { connection }; 