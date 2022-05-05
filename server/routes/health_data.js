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

router.post('/getdailydata', verifyToken, async (req, res) => {
  try {
    
    const doc = await HealthData.find({ client_id: req.user.userId, date: { $gte: Date.now()-86400000 }}); //1651038626122
    if (!doc) return res.status(NOT_FOUND).send();
    return res.status(OK).send(doc);
  } catch (err) {
    return res.status(BAD_REQUEST).send(err.message);
  }
});

router.post('/getweeklydata', verifyToken, async (req, res) => {
  try {
    
    const doc = await HealthData.find({ client_id: req.user.userId, date: { $gte: Date.now()-604800000 }}).sort({date:1}); //1651038626122
    if (!doc) return res.status(NOT_FOUND).send();
    return res.status(OK).send(doc);
  } catch (err) {
    return res.status(BAD_REQUEST).send(err.message);
  }
});

router.post('/getmonthlydata', verifyToken, async (req, res) => {
  try {
    
    const doc = await HealthData.find({ client_id: req.user.userId, date: { $gte: Date.now()-2592000000 }}).sort({date:1}); //1651038626122
    if (!doc) return res.status(NOT_FOUND).send();
    return res.status(OK).send(doc);
  } catch (err) {
    return res.status(BAD_REQUEST).send(err.message);
  }
});

module.exports = router;