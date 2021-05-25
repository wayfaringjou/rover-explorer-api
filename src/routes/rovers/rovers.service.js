const fetchNASA = require('../../utils/fetchNASA');
const { InactiveCameraError, PropertiesError } = require('../../utils/customErrors');

const rover = ({ name = '', activeCameras = [] } = {}) => ({
  name,
  activeCameras,
  fetchInfo() {
    try {
      return fetchNASA(`${this.name}`, []);
    } catch (error) {
      return error;
    }
  },
  fetchPhotos({
    sol = null, earth_date = null, camera = null, page = 1,
  } = {}) {
    try {
      if (camera !== null && !this.activeCameras.includes(camera)) {
        throw new InactiveCameraError(camera, 400, 'Invalid camera for this rover.');
      }
      if (sol === null && earth_date === null) {
        throw new PropertiesError(['sol', 'earth_date'], 400, 'Missing required sol or earth_date value.');
      }

      const queries = [];
      if (camera) queries.push(`camera=${camera}`);
      if (page) queries.push(`page=${page}`);

      if (sol !== null) {
        const solRegex = /^\d+$/;
        if (!solRegex.test(sol)) {
          throw new PropertiesError(['sol'], 400, 'Invalid sol format. Must be a number starting from 0.');
        } else {
          queries.push(`sol=${sol}`);
          return fetchNASA(`${this.name}/photos`, queries);
        }
      }

      if (earth_date !== null) {
        const dateRegex = /^20\d{1,2}-(0{0,1}[1-9]|1[1-2])-([0-2]{0,1}\d|3[0-1])$/;
        if (!dateRegex.test(earth_date)) {
          throw new PropertiesError(['earth_date'], 400, 'Invalid date format. Must be YYYY-MM-DD or YYYY-M-D. (Year must be higher than 2000).');
        } else {
          queries.push(`earth_date=${earth_date}`);
          return fetchNASA(`${this.name}/photos`, queries);
        }
      }

      return fetchNASA(`${this.name}/photos`, queries);
    } catch (error) {
      return error;
    }
  },
});

// Set of active cameras for all rovers
const camSetCommon = ['fhaz', 'rhaz', 'navcam'];

// Opportunity and Spirit share camera set, Curiosity has another set
const camSet1 = [...camSetCommon, 'pancam', 'minites'];
const camSet2 = [...camSetCommon, 'mast', 'chemcam', 'mahli', 'mardi'];

// Perseverance has a different set of cameras
const camSet3 = [
  'EDL_RUCAM',
  'EDL_DDCAM',
  'EDL_PUCAM1',
  'EDL_PUCAM2',
  'NAVCAM_LEFT',
  'NAVCAM_RIGHT',
  'MCZ_RIGHT',
  'MCZ_LEFT',
  'FRONT_HAZCAM_LEFT_A',
  'FRONT_HAZCAM_RIGHT_A',
  'REAR_HAZCAM_LEFT',
  'REAR_HAZCAM_RIGHT',
  'EDL_RDCAM',
  'SKYCAM',
  'SHERLOC_WATSON'];

const activeRovers = {
  opportunity: rover({ name: 'opportunity', activeCameras: camSet1 }),
  spirit: rover({ name: 'spirit', activeCameras: camSet1 }),
  curiosity: rover({ name: 'curiosity', activeCameras: camSet2 }),
  perseverance: rover({ name: 'perseverance', activeCameras: camSet3 }),
};

module.exports = activeRovers;
