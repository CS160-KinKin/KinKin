const express = require('express');
const router = express.Router();
const { verifyToken } = require('../util/auth');
const User = require('../models/User');
const Pt = require('../models/Pt');
const Client = require('../models/Client');
const { OK, BAD_REQUEST, NOT_FOUND, UNAUTHORIZED, CONFLICT } =
  require('../util/constants').STATUS_CODES;

router.put('/', verifyToken, async (req, res) => {
  try {
    const { bio, languages, location, specialties, rate, availableDays } =
      req.body;
    const dup = await Pt.findById(req.user.userId);
    if (dup) {
      return res.status(CONFLICT).send();
    }
    const doc = await Pt.create({
      _id: req.user.userId,
      bio,
      languages,
      location,
      specialties,
      rate,
      availableDays,
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
    doc.availableDays = req.body.availableDays || doc.availableDays;
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
    const { location, maxDistance, minRate, maxRate, availability } =
      req.body.query;
    const filters = {};
    if (req.body.query.language)
      filters.languages = req.body.query.language.toUpperCase();
    if (req.body.query.specialty)
      filters.specialties = req.body.query.specialty.toUpperCase();
    if (availability && availability.length)
      filters.availableDays = { $in: availability };
    if (location)
      filters.location = {
        $near: {
          $geometry: location,
          $maxDistance: maxDistance,
          $minDistance: 0,
        },
      };
    if (minRate && maxRate && minRate <= maxRate)
      filters.rate = { $gte: minRate, $lte: maxRate };
    else if (minRate) filters.rate = { $gte: minRate };
    else if (maxRate) filters.rate = { $lte: maxRate };
    const matchDocs = [];
    for await (const doc of Pt.find(filters)) {
      try {
        const user = await User.findById(doc._id);
        matchDocs.push({
          id: doc._id,
          name: user.publicName,
          languages: doc.languages,
          specialties: doc.specialties,
          bio: doc.bio,
          location: doc.location,
          rate: doc.rate,
          availableDays: doc.availableDays,
          positiveRatingCount: doc.positiveRatingCount,
          negativeRatingCount: doc.negativeRatingCount,
        });
      } catch (error) {
        console.error('routes/pt.js found missing User doc: ' + error.message);
      }
    }
    return res.status(OK).send(matchDocs);
  } catch (err) {
    return res.status(BAD_REQUEST).send(err.message);
  }
});

router.post('/request', verifyToken, async (req, res) => {
  try {
    const pt_id = req.body.pt_id; // ID of PT that was requested
    const client_id = req.user.userId; // ID of client that made request

    if (pt_id === client_id) {
      return res.status(BAD_REQUEST).send('Client and PT are the same user.');
    }

    const pt = await Pt.findById(pt_id);
    const client = await Client.findById(client_id);
    if (!pt || !client) {
      return res.status(NOT_FOUND).send();
    }
    if (client.pt === pt._id && pt.clients.indexOf(client._id) !== -1) {
      return res.status(CONFLICT).send('PT already has user as a client.');
    }
    if (pt.requests.indexOf(client._id) === -1) {
      pt.requests.push(client._id);
    }
    if (client.requests.indexOf(pt._id) === -1) {
      client.requests.push(pt._id);
    }
    await pt.save();
    await client.save();
    return res.status(OK).send();
  } catch (err) {
    return res.status(BAD_REQUEST).send(err.message);
  }
});

router.post('/getrequests', verifyToken, async (req, res) => {
  try {
    const id = req.user.userId;
    const doc = await Pt.findById(id);
    if (!doc) return res.status(NOT_FOUND).send();

    const requests = doc.requests;
    const clients = [];

    for await (const user of User.find({ _id: { $in: requests } })) {
      try {
        clients.push({ name: user.publicName, id: user._id });
      } catch (err) {
        console.error('/getrequests found missing User doc: ' + err.message);
      }
    }

    return res.status(OK).send(clients);
  } catch (err) {
    return res.status(BAD_REQUEST).send(err.message);
  }
});

router.post('/acceptrequest', verifyToken, async (req, res) => {
  try {
    const ptId = req.user.userId;
    const clientId = req.body.id;

    if (ptId === clientId) {
      return res.status(BAD_REQUEST).send('PT and client are same user');
    }

    const pt = await Pt.findById(ptId);
    const client = await Client.findById(clientId);
    if (!pt || !client) {
      return res.status(NOT_FOUND).send();
    }
    if (client.pt && client.pt.length()) {
      return res.status(UNAUTHORIZED).send('Client has a pt already');
    }
    client.pt = pt._id;
    for (const id of client.requests) {
      if (id !== pt._id)
        await Pt.findByIdAndUpdate(id, { $pullAll: { requests: client._id } });
    }
    client.requests = [];
    pt.requests.splice(pt.requests.indexOf(client._id), 1);
    if (pt.clients.indexOf(client._id) === -1) pt.clients.push(client._id);
    await client.save();
    await pt.save();
    return res.status(OK).send();
  } catch (err) {
    return res.status(BAD_REQUEST).send(err.message);
  }
});

router.post('/deleterequest', verifyToken, async (req, res) => {
  try {
    const ptId = req.user.userId;
    const clientId = req.body.id;

    const pt = await Pt.findById(ptId);
    if (pt && pt.requests.indexOf(clientId) !== -1) {
      pt.requests.splice(pt.requests.indexOf(clientId), 1);
      await pt.save();
    }

    const client = await Client.findById(clientId);
    if (client && client.requests.indexOf(ptId) !== -1) {
      client.requests.splice(client.requests.indexOf(ptId), 1);
      await client.save();
    }

    return res.status(OK).send();
  } catch (err) {
    return res.status(BAD_REQUEST).send(err.message);
  }
});

module.exports = router;
