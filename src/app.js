require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV, CLIENT_ORIGIN } = require('../config');

const app = express();

app.use(logger((NODE_ENV === 'production') ? 'common' : 'common', {
  skip: () => NODE_ENV === 'test',
}));
app.use(cors({
  origin: CLIENT_ORIGIN,
}));
app.use(helmet());

app.use(express.json());

app.all('/', (req, res) => {
  res.send('Hello Explorer!');
});

app.use((req, res, _next) => {
  res.status(404).send('Not Found');
});

app.use((error, req, res, _next) => {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: error.message };
  } else {
    console.error(error);
    response = { error: error.message, object: error };
  }
  res.status(500).json(response);
});

module.exports = app;