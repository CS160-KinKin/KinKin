const express = require('express');
const router = express.Router();
const { verifyToken } = require('../util/auth');
const User = require('../models/User');
const Pt = require('../models/Pt');
const { OK, BAD_REQUEST, NOT_FOUND } =
  require('../util/constants').STATUS_CODES;

router.put('/', verifyToken, async (req, res) => {
  try {
    const { bio, languages, location, specialties, rate, availableTimes } =
      req.body;
    const doc = await Pt.create({
      _id: req.user.userId,
      bio,
      languages,
      location,
      specialties,
      rate,
      availableTimes
    });
    res.status(OK).send(doc);
  } catch (err) {
    res.status(BAD_REQUEST).send(err.message);
  }
});

router.route('/').delete(verifyToken, async (req, res) => {
  try {
    const doc = await Pt.findByIdAndDelete(req.user.userId);
    if (!doc) return res.status(NOT_FOUND).send();
    return res.status(OK).send(doc);
  } catch (err) {
    return res.status(NOT_FOUND).send(err.message);
  }
});

router.route('/').post(verifyToken, async (req, res) => {
  try {
    const doc = await Pt.findById(req.user.userId);
    if (!doc) return res.status(NOT_FOUND).send();
    doc.languages = req.body.languages || doc.languages;
    doc.bio = req.body.bio || doc.bio;
    doc.location = req.body.location || doc.location;
    doc.rate = req.body.rate || doc.rate;
    doc.specialties = req.body.specialties || doc.specialties;
    doc.availableTimes = req.body.availableTimes || doc.availableTimes;
    await doc.save();
    return res.status(OK).send(doc);
  } catch (err) {
    return res.status(BAD_REQUEST).send(err.message);
  }
});

router.post('/get', verifyToken, async (req, res) => {
  try {
    const doc = await Pt.findById(req.user.userId);
    if (!doc) return res.status(NOT_FOUND).send();
    return res.status(OK).send(doc);
  } catch (err) {
    return res.status(BAD_REQUEST).send(err.message);
  }
});

router.get('/get/:username', verifyToken, async (req, res) => {
  try {
    const { username } = req.params;
    const userDoc = await User.find({ username });
    if (!userDoc) return res.status(NOT_FOUND).send();
    const ptDoc = await Pt.findById(userDoc._id);
    if (!ptDoc) return res.status(NOT_FOUND).send();
    return res.status(OK).send(ptDoc);
  } catch (err) {
    return res.status(BAD_REQUEST).send(err.message);
  }
});

router.post('/search', verifyToken, async (req, res) => {
  try {
    const { location, maxDistance, minRate, maxRate, availability } = req.query;
    const filters = {};
    if (req.query.language) filters.languages = req.query.language.toUpperCase();
    if (req.query.specialty) filters.specialties = req.query.specialty.toUpperCase();
    if (availability && availability.length) filters.availableDays = { $in: availability };
    if (location) filters.location = { $near: { $geometry: location, $maxDistance: maxDistance, $minDistance: 0 } };
    if (minRate <= maxRate) filters.rate = { $gte: minRate, $lte: maxRate };
    const matchDocs = [];
    for await (const doc of Pt.find(filters)) {
      try {
        const user = await User.findById(doc._id);
        matchDocs.push({
          name: user.publicName,
          languages: doc.languages,
          specialties: doc.specialties,
          bio: doc.bio,
          location: doc.location,
          rate: doc.rate,
          availableDays: doc.availableDays,
          positiveRatingCount: doc.positiveRatingCount,
          negativeRatingCount: doc.negativeRatingCount
        });
      } catch (error) {
        console.error(
          'routes/pt.js found missing User doc: ' +
          error.message
        );
      }
    }
    return res.status(OK).send(matchDocs);
  } catch (err) {
    return res.status(BAD_REQUEST).send(err.message);
  }
});

module.exports = router;
