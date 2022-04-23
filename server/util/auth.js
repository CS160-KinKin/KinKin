const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const { STATUS_CODES } = require('./constants');
const User = require('../models/User');
const Token = require('../models/Token');

require('dotenv').config({ path: './config.env' });

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const createTokens = async (userId, payload) => {
  const tokenDoc = await Token.create({ userId });
  payload.id = tokenDoc._id;
  payload.userId = userId;
  const session = jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: '7d',
  });
  await Token.deleteMany({
    $and: [{ _id: { $ne: tokenDoc._id } }, { userId }],
  });
  // const refresh = jwt.sign(
  //   {
  //     userId,
  //     id: tokenDoc._id,
  //   },
  //   process.env.JWT_KEY,
  //   {
  //     expiresIn: '7d',
  //   }
  // );
  return session;
};

const verifyToken = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(STATUS_CODES.FORBIDDEN).json('Missing token');
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const doc = await Token.findById(decoded.id);
    if (doc) req.user = decoded;
    else return res.status(STATUS_CODES.FORBIDDEN).json('User is logged out');
  } catch (err) {
    return res.status(STATUS_CODES.BAD_REQUEST).send('Invalid Token');
  }
  return next();
};

/**
 * Get a user's email and email verification from a Google token.
 * @param {string | null} tokenId Google Token ID
 * @return {Promise<string> | Promise<null>} Token info or null if invalid.
 * Be sure to check both email and email_verified.
 */
const getGoogleTokenInfo = async (tokenId) => {
  if (!tokenId) return null;
  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    return ticket.getPayload();
  } catch {
    return null;
  }
};

const handleLogin = async (req, res) => {
  try {
    if (!req.body) {
      res.status(STATUS_CODES.BAD_REQUEST).send('Missing tokenId');
      return;
    }
    const googleTokenInfo = await getGoogleTokenInfo(req.body.tokenId);
    if (!googleTokenInfo) {
      res.status(STATUS_CODES.UNAUTHORIZED).send('Invalid token');
      return;
    }
    if (!googleTokenInfo.email_verified) {
      res
        .status(STATUS_CODES.UNAUTHORIZED)
        .send('Email not verified with Google');
      return;
    }

    const id = googleTokenInfo.sub;
    const token = await createTokens(id, { email: googleTokenInfo.email });
    const userDoc = await User.findById(id);
    if (userDoc) {
      userDoc.publicName = googleTokenInfo.name;
      userDoc.email = googleTokenInfo.email;
      userDoc.pictureUrl = googleTokenInfo.pictureUrl;
      await userDoc.save();
      return res.status(STATUS_CODES.OK).send({
        email: googleTokenInfo.email,
        username: userDoc.username,
        publicName: googleTokenInfo.name,
        pictureUrl: googleTokenInfo.picture,
        token,
        newUser: false,
      });
    } else {
      return res.status(STATUS_CODES.OK).send({
        email: googleTokenInfo.email,
        publicName: googleTokenInfo.name,
        pictureUrl: googleTokenInfo.picture,
        token,
        newUser: true,
      });
    }
  } catch (err) {
    return res.status(STATUS_CODES.BAD_REQUEST).send(err.message);
  }
};

const handleLogout = async (req, res) => {
  try {
    await Token.deleteMany({ userId: req.user.userId });
    return res.status(STATUS_CODES.OK).send();
  } catch {
    return res.status(STATUS_CODES.FORBIDDEN).send('Missing token');
  }
};

module.exports = { getGoogleTokenInfo, verifyToken, handleLogin, handleLogout };
