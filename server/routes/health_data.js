const express = require('express');
const router = express.Router();
const { verifyToken } = require('../util/auth');
const User = require('../models/User');
const Client = require('../models/Client');
const HealthData = require('../models/HealthData');
const { OK, BAD_REQUEST, NOT_FOUND } = require('../util/constants').STATUS_CODES;



router.post('/create', verifyToken, async (req, res) => {
    try {
      const { calories, distance, minutes } = req.body;

      const doc = await HealthData.create({
        client_id: req.user.userId,
        calories,
        distance,
        minutes
      });
   
    
      res.status(OK).send(doc);
    } catch (err) {
      res.send(err.message);
    }
  });

  module.exports = router;