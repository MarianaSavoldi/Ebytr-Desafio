const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'ok' });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server online on ${PORT}`)
});