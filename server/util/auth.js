const jwt = require('jsonwebtoken');
const {OAuth2Client} = require("google-auth-library");
const {STATUS_CODES} = require("./constants");

require("dotenv").config({ path: "./config.env" });

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(STATUS_CODES.FORBIDDEN).json("Missing token");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(STATUS_CODES.BAD_REQUEST).send("Invalid Token");
  }
  return next();
};

/**
 * Get a user's email and email verification from a Google token.
 * @param {string | null} tokenId Google Token ID
 * @return {Promise<string> | Promise<null>} Token info or null if invalid.
 * Be sure to check both email and email_verified.
 */
async function getGoogleTokenInfo(tokenId) {
  if (!tokenId) return null;
  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    return ticket.getPayload();
  } catch {
    return null;
  }
}

module.exports = {getGoogleTokenInfo, verifyToken};
