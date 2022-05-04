const express = require('express');
const router = express.Router();
const { verifyToken } = require('../util/auth');
const User = require('../models/User');
const Client = require('../models/Client');
const HealthData = require('../models/HealthData');
//const { DAYS_OF_WEEK } = require('../../src/util/constants');
const { OK, BAD_REQUEST, NOT_FOUND } = require('../util/constants').STATUS_CODES;



router.post('/create', verifyToken, async (req, res) => {
  try {
    const { calories, distanceWalked, distanceRan, distanceCycled, minutes } = req.body;

    const doc = await HealthData.create({
      client_id: req.user.userId,
      calories,
      distanceWalked,
      distanceRan,
      distanceCycled,
      minutes
    });


    return res.status(OK).send(doc);
  } catch (err) {
    return res.send(err.message);
  }
});

router.post('/get', verifyToken, async (req, res) => {
  try {
    const doc = await HealthData.find({ client_id: req.user.userId, date: { $gte: 1651038626122 }});
    if (!doc) return res.status(NOT_FOUND).send();
    return res.status(OK).send(doc);
  } catch (err) {
    return res.send(err.message);
  }
});

module.exports = router;