const express = require('express');
const router = express.Router();
const { verifyToken } = require('../util/auth');
const User = require('../models/User');
const Client = require('../models/Client');
const Pt = require('../models/Pt');
const { OK, BAD_REQUEST, NOT_FOUND, CONFLICT } =
  require('../util/constants').STATUS_CODES;

router.put('/', verifyToken, async (req, res) => {
  try {
    const { bio, languages, location, interests, trainingGoals } = req.body;
    const dup = await Client.findById(req.user.userId);
    if (dup) {
      return res.status(CONFLICT).send();
    }
    const doc = await Client.create({
      _id: req.user.userId,
      bio,
      languages,
      location,
      interests,
      trainingGoals,
    });
    return res.status(OK).send(doc);
  } catch (err) {
    console.error(err);
    return res.status(BAD_REQUEST).send(err.message);
  }
});

router.route('/').delete(verifyToken, async (req, res) => {
  try {
    const doc = await Client.findByIdAndDelete(req.user.userId);
    if (!doc) return res.status(NOT_FOUND).send();
    return res.status(OK).send(doc);
  } catch (err) {
    return res.status(BAD_REQUEST).send(err.message);
  }
});

router.route('/').post(verifyToken, async (req, res) => {
  try {
    const doc = await Client.findById(req.user.userId);
    if (!doc) return res.status(NOT_FOUND).send();
    doc.languages = req.body.languages || doc.languages;
    doc.bio = req.body.bio || doc.bio;
    doc.location = req.body.location || doc.location;
    doc.rate = req.body.rate || doc.rate;
    doc.interests = req.body.interests || doc.interests;
    doc.trainingGoals = req.body.trainingGoals || doc.trainingGoals;
    await doc.save();
    return res.status(OK).send(doc);
  } catch (err) {
    return res.status(BAD_REQUEST).send(err.message);
  }
});

router.post('/get', verifyToken, async (req, res) => {
  try {
    const doc = await Client.findById(req.user.userId);
    if (!doc) return res.status(NOT_FOUND).send();
    return res.status(OK).send(doc);
  } catch (err) {
    return res.status(BAD_REQUEST).send(err.message);
  }
});

router.get('/get/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userDoc = await User.findById(id);
    if (!userDoc) return res.status(NOT_FOUND).send();
    const clientDoc = await Client.findById(id);
    if (!clientDoc) return res.status(NOT_FOUND).send();
    return res.status(OK).send({
      id: userDoc._id,
      publicName: userDoc.publicName,
      pictureUrl: userDoc.pictureUrl,
      positiveRatingCount: clientDoc.positiveRatingCount,
      negativeRatingCount: clientDoc.negativeRatingCount,
      languages: clientDoc.languages,
      location: clientDoc.location,
      interests: clientDoc.interests,
      bio: clientDoc.bio,
    });
  } catch (err) {
    return res.status(BAD_REQUEST).send(err.message);
  }
});

router.post('/requests/get', verifyToken, async (req, res) => {
  try {
    const id = req.user.userId;
    const doc = await Client.findById(id);
    if (!doc) return res.status(NOT_FOUND).send();

    const requests = doc.requests;
    const pts = [];

    for await (const user of User.find({ _id: { $in: requests } })) {
      try {
        pts.push({ name: user.publicName, id: user._id });
      } catch (err) {
        console.error(
          '/client/requests/get found missing User doc: ' + err.message
        );
      }
    }

    return res.status(OK).send(pts);
  } catch (err) {
    return res.status(BAD_REQUEST).send(err.message);
  }
});

router.put('/requests', verifyToken, async (req, res) => {
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

router.delete('/requests', verifyToken, async (req, res) => {
  try {
    const clientId = req.user.userId;
    const ptId = req.body.id;

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

router.post('/requests/get', verifyToken, async (req, res) => {
  try {
    const id = req.user.userId;
    const doc = await Client.findById(id);
    if (!doc) return res.status(NOT_FOUND).send();

    const requests = doc.requests;
    const pts = [];

    for await (const user of User.find({ _id: { $in: requests } })) {
      try {
        pts.push({ name: user.publicName, id: user._id });
      } catch (err) {
        console.error(
          '/client/requests/get found missing User doc: ' + err.message
        );
      }
    }

    return res.status(OK).send(pts);
  } catch (err) {
    return res.status(BAD_REQUEST).send(err.message);
  }
});

router.put('/requests', verifyToken, async (req, res) => {
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

router.delete('/requests', verifyToken, async (req, res) => {
  try {
    const clientId = req.user.userId;
    const ptId = req.body.id;

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
