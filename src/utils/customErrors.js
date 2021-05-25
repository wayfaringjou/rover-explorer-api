/* eslint-disable max-classes-per-file */
// TODO add http status to pass to error handler

// For camera queries that are inactive for a rover
class HttpError extends Error {
  constructor(status = '', ...params) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }
    this.name = 'httpError';
    this.status = status;
  }
}

// For camera queries that are inactive for a rover
class InactiveCameraError extends HttpError {
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
class PropertiesError extends HttpError {
  constructor(properties = [], ...params) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, PropertiesError);
    }
    this.name = 'PropertiesError';
    this.properties = properties;
  }
}

module.exports = { HttpError, InactiveCameraError, PropertiesError };
