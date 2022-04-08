const express = require('express');
const router = express.Router();

const axios = require('axios');

const User = require('../models/Client');
const Client = require('../models/Client');

const { OK, BAD_REQUEST, UNAUTHORIZED, FORBIDDEN, NOT_FOUND, CONFLICT } 
= require('../../util/constants').STATUS_CODES;

// does auth handle

router.get('/test', (req,res) => {
  res.send('testing hi')
})

router.post('/add', (req,res) => {
  const newClient = new Client({
    email: req.body.email,
    name: req.body.name,
    bio: req.body.location,
    language: req.body.language,
    location: req.body.location,
    image: req.body.image,
    interests: req.body.interests,
    trainingGoals: req.body.trainingGoals
  })
  newClient.save()
  .then((p) => res.json(p))
  .catch(err => res.status(BAD_REQUEST).json('Error: ' + err))
})



router.get('/', (req,res) => {
  User.find()
  .then(users => res.json(users))
  .catch(err => res.status(BAD_REQUEST).json('Error: ' + err))
})

router.get('/:username',(req,res) => {
  Client.findById(req.params.username)
  .then(client => res.json(client))
  .catch(err => res.status(BAD_REQUEST).json('User not found'))
})

module.exports = router;
