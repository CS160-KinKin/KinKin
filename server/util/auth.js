const {OAuth2Client} = require('google-auth-library');
require("dotenv").config({ path: "./config.env" });

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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

module.exports = {getGoogleTokenInfo};
