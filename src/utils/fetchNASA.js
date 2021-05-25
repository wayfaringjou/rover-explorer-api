const fetch = require('node-fetch');
const { NASA_TOKEN, NASA_ENDPOINT } = require('../../config');

// Setting a default query of 'sol=0' to avoid empty returns
const fetchNASA = async (path = '', query = ['sol=0']) => {
  const parsedQuery = query.join('&');
  const token = `${query.length > 0 ? '&' : ''}api_key=${NASA_TOKEN}`;
  let payload;

  try {
    console.log(`${NASA_ENDPOINT}/${path}?${parsedQuery}${token}`);
    payload = await fetch(`${NASA_ENDPOINT}/${path}?${parsedQuery}${token}`, {
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
