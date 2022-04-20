const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../util/auth');
const User = require('../models/Client');
const Client = require('../models/Client');
const { OK, BAD_REQUEST, NOT_FOUND } =
  require('../../util/constants').STATUS_CODES;

router.put('/', verifyToken, async (req, res) => {
  try {
    const { bio, language, location, interests, trainingGoals } =
      req.body;
    const newClient = await Client.create({
      _id: req.user.userId,
      bio,
      language,
      location,
      interests,
      trainingGoals,
    });
    res.status(OK).send(newClient);
  } catch (err) {
    res.status(BAD_REQUEST).send(err.message);
  }
});

router.post('/get', verifyToken, async (req, res) => {
  try {
    const clientDoc = await Client.findById(req.user.userId);
    return res.status(OK).send(clientDoc);
  } catch (err) {
    return res.status(BAD_REQUEST).send(err.message);
  }
});

router.get('/get/:username', verifyToken, async (req, res) => {
  try {
    const { username } = req.params;
    const userDoc = await User.find({ username });
    const clientDoc = await Client.findById(userDoc._id);
    return res.status(OK).send(clientDoc);
  } catch (err) {
    return res.status(NOT_FOUND).send(err.message);
  }
});

module.exports = router;
