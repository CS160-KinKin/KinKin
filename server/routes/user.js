const express = require('express');
const router = express.Router();
const { verifyToken } = require('../util/auth');
const User = require('../models/User');
const { STATUS_CODES } = require('../util/constants');

router.put('/', verifyToken, async (req, res) => {
  try {
    const { publicName, pictureUrl } = req.body;
    const username = req.body.username.toLowerCase();
    const doc = await User.create({
      _id: req.user.userId,
      username,
      publicName,
      email: req.user.email,
      pictureUrl,
    });
    res.status(STATUS_CODES.OK).send(doc);
  } catch (err) {
    res.status(STATUS_CODES.BAD_REQUEST).send(err.message);
  }
});

router.route('/').delete(verifyToken, async (req, res) => {
  try {
    const doc = await User.findByIdAndDelete(req.user.userId);
    if (!doc) return res.status(STATUS_CODES.NOT_FOUND).send();
    return res.status(STATUS_CODES.OK).send(doc);
  } catch (err) {
    return res.status(STATUS_CODES.BAD_REQUEST).send(err.message);
  }
});

router.route('/').post(verifyToken, async (req, res) => {
  try {
    const doc = await User.findById(req.user.userId);
    if (!doc) return res.status(STATUS_CODES.NOT_FOUND).send();
    doc.email = req.user.email || doc.email;
    doc.username = req.body.username || doc.username;
    doc.publicName = req.body.publicName || doc.publicName;
    doc.pictureUrl = req.body.pictureUrl || doc.pictureUrl;
    await doc.save();
    return res.status(STATUS_CODES.OK).send(doc);
  } catch (err) {
    return res.status(STATUS_CODES.BAD_REQUEST).send(err.message);
  }
});

router.post('/get', verifyToken, async (req, res) => {
  try {
    const doc = await User.findById(req.user.userId);
    if (!doc) return res.status(STATUS_CODES.NOT_FOUND).send();
    return res.status(STATUS_CODES.OK).send(doc);
  } catch (err) {
    return res.status(STATUS_CODES.BAD_REQUEST).send(err.message);
  }
});

router.get('/users', verifyToken, async (req, res) => {
  try {
    const doc = await User.find({}).then(userss => res.status(OK)).send(users);
  } catch(e) {}
    
});

module.exports = router;
