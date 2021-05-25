const express = require('express');
const activeRovers = require('./rovers.service');

const roversRouter = express.Router();

roversRouter.route('/')
  .get(async (req, res) => {
    const requestedRover = activeRovers[res.locals.roverId];
    console.log(requestedRover);
    const roverInfo = await requestedRover.fetchInfo();
    console.log(roverInfo);
    res.send(roverInfo);
  });

roversRouter.route('/photos')
  .get(async (req, res) => {
    const requestedRover = activeRovers[res.locals.roverId];
    console.log(requestedRover);
    const roverPhotos = await requestedRover.fetchPhotos({ sol: 0 });
    console.log(roverPhotos);
    res.send(roverPhotos);
  });

module.exports = roversRouter;
