const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../util/auth');
const User = require('../models/User');
const PT = require('../models/PT');
const { OK, BAD_REQUEST, NOT_FOUND } =
  require('../../util/constants').STATUS_CODES;

router.put('/', verifyToken, async (req, res) => {
  try {
    const { bio, languages, location, specialties, rate, availableTimes } =
      req.body;
    const doc = await PT.create({
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
    const doc = await PT.findByIdAndDelete(req.user.userId);
    if (!doc) return res.status(STATUS_CODES.NOT_FOUND).send();
    return res.status(OK).send(doc);
  } catch (err) {
    return res.status(NOT_FOUND).send(err.message);
  }
});

router.route('/').post(verifyToken, async (req, res) => {
  try {
    const doc = await PT.findById(req.user.userId);
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
    const doc = await PT.findById(req.user.userId);
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
    const pTDoc = await PT.findById(userDoc._id);
    if (!pTDoc) return res.status(NOT_FOUND).send();
    return res.status(OK).send(pTDoc);
  } catch (err) {
    return res.status(BAD_REQUEST).send(err.message);
  }
});

module.exports = router;
