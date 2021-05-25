/* eslint-disable max-classes-per-file */

// For camera queries that are inactive for a rover
class InactiveCameraError extends Error {
  constructor(inactiveCamera = '', ...params) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InactiveCameraError);
    }
    this.name = 'InactiveCameraError';
    this.inactiveCamera = inactiveCamera;
  }
}

// For missing or invalid properties
class PropertiesError extends Error {
  constructor(properties = [], ...params) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, PropertiesError);
    }
    this.name = 'PropertiesError';
    this.properties = properties;
  }
}

module.exports = { InactiveCameraError, PropertiesError };
