const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const request = require('request');
const cognitoConfig = require('../config');

const fetchCognitoPublicKeys = () => {
  return new Promise((resolve, reject) => {
    const url = `https://cognito-idp.${cognitoConfig.region}.amazonaws.com/${cognitoConfig.userPoolId}/.well-known/jwks.json`;
    request(url, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(body).keys);
      }
    });
  });
};

const verifyToken = async (token) => {
  const publicKeys = await fetchCognitoPublicKeys();
  let isTokenValid = false;

  for (const key of publicKeys) {
    const pem = jwkToPem(key);
    try {
      const decoded = jwt.verify(token, pem, { issuer: `https://cognito-idp.${cognitoConfig.region}.amazonaws.com/${cognitoConfig.userPoolId}` });
      isTokenValid = true;
      return decoded;
    } catch (err) {
      // Token verification failed, try the next key
    }
  }

  if (!isTokenValid) {
    throw new Error('Invalid token');
  }
};

module.exports = {
  verifyToken,
};