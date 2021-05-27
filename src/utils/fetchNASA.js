const fetch = require('node-fetch');
const { NASA_TOKEN, NASA_BASEPATH } = require('../../config');

const fetchNASA = async (path = '', query = []) => {
  const parsedQuery = query.join('&');
  const token = `${query.length > 0 ? '&' : ''}api_key=${NASA_TOKEN}`;
  let payload;

  try {
    payload = await fetch(`${NASA_BASEPATH}${path}?${parsedQuery}${token}`, {
      method: 'GET',
      headers: { 'Content-type': 'application/json; charset=utf-8' },
    });

    if (payload?.status !== 200) {
      throw new Error({ status: payload?.status, error: payload?.error });
    }

    payload = await payload.json();

    return payload;
  } catch (error) {
    return error;
  }
};

module.exports = fetchNASA;
