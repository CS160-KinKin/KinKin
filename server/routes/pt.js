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

router.get('/search', verifyToken, async (req, res) => {
  try {
    const { location, minRate, maxRate, availability } = req.query;
    const language = req.query.language.toUpperCase();
    const specialty = req.query.specialty.toUpperCase();
    const filters = [];
    const matchDocs = [];
    if (language) {
      filters.push(doc => doc.languages.includes(language));
    }
    if (location) {
      filters.push(doc => doc.location.);
    }
    if (language) {
      filters.push(doc => doc.languages.includes(language));
    }
    for await (const doc of User.find()) {
      let goodBoy = true;
      for (const filter of filters ) {
        if (!filter(doc)) { 
          goodBoy = false; 
          break;
        }
      }
      if (goodBoy) matchDocs.push(doc);
    }
    return res.status(OK).send(matchDocs);
  } catch (err) {
    return res.status(BAD_REQUEST).send(err.message);
  }
});

module.exports = router;
