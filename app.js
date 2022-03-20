const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const users = require('./routes/users');
const cards = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '622f5e89ecc3fff31f0d8ded',
  };

  next();
});
app.use('/', users);
app.use('/', cards);

app.use((req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

app.listen(PORT, () => {
  console.log('Сервер запущен');
});
