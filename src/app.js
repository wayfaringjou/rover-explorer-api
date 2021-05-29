require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV, CLIENT_ORIGIN } = require('../config');

// Routes
const roversRouter = require('./routes/rovers/rovers.router');

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

app.use('/api/rovers/:roverId', (req, res, next) => {
  res.locals.roverId = req.params.roverId;
  next();
}, roversRouter);

app.use((_req, res) => {
  res.status(404).send('Not Found');
});

app.use((error, _req, res, _next) => {
  let response;
  if (NODE_ENV === 'production' || NODE_ENV === 'test') {
    console.error(error);
    console.error(...error);
    response = { error: error.message, object: error };
  } else {
    console.error(error);
    response = { error: error.message, object: error };
  }
  res.status(error?.status ?? 500).json(response);
});

module.exports = app;
