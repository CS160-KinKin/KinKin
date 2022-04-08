/**
 * Get a user's email and email verification from a Google token.
 * @param {string | null} tokenId Google Token ID
 * @return {Promise<string> | Promise<null>} Token info or null if invalid.
 * Be sure to check both email and email_verified.
 */
async function getGoogleTokenInfo(tokenId) {
  if (!tokenId) return null;
  const res = await fetch('https://oauth2.googleapis.com/tokeninfo', {
      method: 'GET',
      body: JSON.stringify({
        id_token: tokenId,
      }),
      headers: {
          'Content-Type': 'application/json',
      }
  });
  if (parseInt(res.exp) < Date.now()) return null;
  return res;
}

module.exports = {getGoogleTokenInfo};
