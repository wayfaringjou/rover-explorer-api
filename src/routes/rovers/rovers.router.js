const express = require('express');
const activeRovers = require('./rovers.service');
const { HttpError } = require('../../utils/customErrors');

const roversRouter = express.Router();

roversRouter.use((req, res, next) => {
  try {
    if (!(res.locals.roverId in activeRovers)) {
      throw new HttpError(400, 'Invalid Rover Name.');
    } else {
      res.locals.requestedRover = activeRovers[res.locals.roverId];
    }
    next();
  } catch (error) {
    next(error);
  }
});

roversRouter.route('/')
  .get(async (_req, res, next) => {
    try {
      const roverInfo = await res.locals.requestedRover.fetchInfo();
      if (roverInfo instanceof Error) throw roverInfo;
      res.send(roverInfo);
    } catch (error) {
      next(error);
    }
  });

roversRouter.route('/manifest')
  .get(async (_req, res, next) => {
    try {
      const roverInfo = await res.locals.requestedRover.fetchManifest();
      if (roverInfo instanceof Error) throw roverInfo;
      res.send(roverInfo);
    } catch (error) {
      next(error);
    }
  });

roversRouter.route('/photos')
  .get(async (req, res, next) => {
    try {
      const { query } = req;
      const roverPhotos = await res.locals.requestedRover.fetchPhotos(query);
      if (roverPhotos instanceof Error) throw roverPhotos;
      res.send(roverPhotos);
    } catch (error) {
      next(error);
    }
  });

module.exports = roversRouter;
