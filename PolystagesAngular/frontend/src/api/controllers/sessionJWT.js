
const sessionJWT = require ('jsonwebtoken');
const fs = require ('fs');
const path = require('path');

function createSessionJWT (login) {
  const RSA_PRIVATE_KEY = fs.readFileSync('./src/api/keys/jwtRS256.key');

  const jwtToken = sessionJWT.sign(
    {
      login: login,
      midExp: Math.floor(Date.now() / 1000) + 1800 // validité: 30mn
    },
    RSA_PRIVATE_KEY,
    {
      algorithm: 'RS256',
      expiresIn: '1h' // champ exp: validité 1h
    });

  return jwtToken;
}

function createSessionCookie(req, res, payload) {
  let jwtToken = '';
  if ((typeof payload.login !== 'undefined') &&
    (typeof payload.midExp !== 'undefined') &&
    (Math.floor(Date.now() / 1000) <= payload.midExp)) {
    jwtToken = req.cookies.SESSIONID;
  }
  else {
    jwtToken = createSessionJWT(payload.login);
  }

  res.cookie('SESSIONID', jwtToken, {httpOnly:true, secure:false});
}
module.exports.createSessionCookie = createSessionCookie;

function decodeSessionCookie(req) {
  if (typeof req.cookies.SESSIONID === 'undefined') {
    return { login: -1 };
  }
  const sessionid = req.cookies.SESSIONID;

  const RSA_PUBLIC_KEY = fs.readFileSync('./src/api/keys/jwtRS256.key.pub');

  try {
    const token = sessionJWT.verify(
      sessionid,
      RSA_PUBLIC_KEY,
      {algorithms: ['RS256']});

    return token;
  }
  catch (err) {
    return {login: -1};
  }
}
module.exports.decodeSessionCookie = decodeSessionCookie;

