const express = require('express');
const rover = require('./rovers.service');

const setActive = (cams = []) => cams.reduce((acc, curr) => ({ ...acc, [curr]: true }), {});

// Set of active cameras for all rovers
const camCommon = setActive(['fhaz', 'rhaz', 'navcam']);
// Opportunity and Spirit share camera set, Curiosity has another set
const camSet1 = { ...camCommon, ...setActive(['pancam', 'minites']) };
const camSet2 = { ...camCommon, ...setActive(['mast', 'chemcam', 'mahli', 'mardi']) };

const rovers = {
  opportunity: rover({ name: 'opportunity', activeCameras: camSet1 }),
  spirit: rover({ name: 'spirit', activeCameras: camSet1 }),
  curiosity: rover({ name: 'curiosity', activeCameras: camSet2 }),
};

const roversRouter = express.Router();

roversRouter.route('/')
  .get(async (req, res) => {
    const requestedRover = rovers[res.locals.roverId];
    console.log(requestedRover);
    res.end();
  });

module.exports = roversRouter;
