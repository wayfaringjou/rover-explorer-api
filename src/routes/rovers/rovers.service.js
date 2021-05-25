const fetchNASA = require('../../utils/fetchNASA');
const { InactiveCameraError, PropertiesError } = require('../../utils/customErrors');

const cameras = {
  fhaz: false,
  rhaz: false,
  mast: false,
  chemcam: false,
  mahli: false,
  mardi: false,
  navcam: false,
  pancam: false,
  minites: false,
};

const rover = ({ name = '', activeCameras = cameras } = {}) => ({
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
  }) {
    try {
      if (this.activeCameras[camera] === false) {
        throw new InactiveCameraError(camera, 'Invalid camera for this rover.');
      }
      if (sol === null && earth_date === null) {
        throw new PropertiesError(['sol', 'earth_date'], 'Missing required sol or earth_date value.');
      }

      const queries = [];
      if (camera) queries.push(`camera=${camera}`);
      if (page) queries.push(`page=${page}`);

      if (sol) {
        const solRegex = /^\d+$/;
        if (!solRegex.test(sol)) {
          throw new PropertiesError(['sol'], 'Invalid sol format.');
        } else {
          queries.push(`sol=${sol}`);
          return fetchNASA(`${this.name}/photos`, queries);
        }
      }

      if (earth_date) {
        const dateRegex = /^20\d{1,2}-(0{0,1}[1-9]|1[1-2])-([0-2]{0,1}\d|3[0-1])$/;
        if (!dateRegex.test(earth_date)) {
          throw new PropertiesError(['earth_date'], 'Invalid date format.');
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

module.exports = rover;
