const express = require('express');
const router = express.Router();
const { verifyToken } = require('../util/auth');
const User = require('../models/User');
const Client = require('../models/Client');
const { OK, BAD_REQUEST, NOT_FOUND, CONFLICT } =
  require('../util/constants').STATUS_CODES;

router.put('/', verifyToken, async (req, res) => {
  try {
    const { bio, languages, location, interests, trainingGoals } = req.body;
    const dup = await Client.findById(req.user.userId);
    if (dup) {
      return res.status(CONFLICT).send();
    }
    const doc = await Client.create({
      _id: req.user.userId,
      bio,
      languages,
      location,
      interests,
      trainingGoals,
    });
    return res.status(OK).send(doc);
  } catch (err) {
    console.error(err);
    return res.status(BAD_REQUEST).send(err.message);
  }
});

router.route('/').delete(verifyToken, async (req, res) => {
  try {
    const doc = await Client.findByIdAndDelete(req.user.userId);
    if (!doc) return res.status(NOT_FOUND).send();
    return res.status(OK).send(doc);
  } catch (err) {
    return res.status(BAD_REQUEST).send(err.message);
  }
});

router.route('/').post(verifyToken, async (req, res) => {
  try {
    const doc = await Client.findById(req.user.userId);
    if (!doc) return res.status(NOT_FOUND).send();
    doc.languages = req.body.languages || doc.languages;
    doc.bio = req.body.bio || doc.bio;
    doc.location = req.body.location || doc.location;
    doc.rate = req.body.rate || doc.rate;
    doc.interests = req.body.interests || doc.interests;
    doc.trainingGoals = req.body.trainingGoals || doc.trainingGoals;
    await doc.save();
    return res.status(OK).send(doc);
  } catch (err) {
    return res.status(BAD_REQUEST).send(err.message);
  }
});

router.post('/get', verifyToken, async (req, res) => {
  try {
    const doc = await Client.findById(req.user.userId);
    if (!doc) return res.status(NOT_FOUND).send();
    return res.status(OK).send(doc);
  } catch (err) {
    return res.status(BAD_REQUEST).send(err.message);
  }
});

router.get('/get/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userDoc = await User.findById(id);
    if (!userDoc) return res.status(NOT_FOUND).send();
    const clientDoc = await Client.findById(id);
    if (!clientDoc) return res.status(NOT_FOUND).send();
    return res.status(OK).send({
      id: userDoc._id,
      publicName: userDoc.publicName,
      pictureUrl: userDoc.pictureUrl,
      positiveRatingCount: clientDoc.positiveRatingCount,
      negativeRatingCount: clientDoc.negativeRatingCount,
      languages: clientDoc.languages,
      location: clientDoc.location,
      interests: clientDoc.interests,
      bio: clientDoc.bio,
    });
  } catch (err) {
    return res.status(BAD_REQUEST).send(err.message);
  }
});

module.exports = router;
