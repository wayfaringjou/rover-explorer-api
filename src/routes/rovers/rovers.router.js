const express = require('express');
const activeRovers = require('./rovers.service');

const roversRouter = express.Router();
// TODO pass errors correctly to error handling middleware
roversRouter.route('/')
  .get(async (_req, res, next) => {
    const requestedRover = activeRovers[res.locals.roverId];
    try {
      const roverInfo = await requestedRover.fetchInfo();
      res.send(roverInfo);
    } catch (error) {
      next(error);
    }
  });

roversRouter.route('/photos')
  .get(async (req, res, next) => {
    const requestedRover = activeRovers[res.locals.roverId];
    try {
      const { query } = req;
      const roverPhotos = await requestedRover.fetchPhotos(query);
      res.send(roverPhotos);
    } catch (error) {
      next(error);
    }
  });

module.exports = roversRouter;
