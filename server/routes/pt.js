const express = require('express');
const router = express.Router();
const { verifyToken } = require('../util/auth');
const User = require('../models/User');
const Pt = require('../models/Pt');
const Client = require('../models/Client');
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
router.post('/search', verifyToken, async (req, res) => {
  try {
    const { location, maxDistance, minRate, maxRate, availability } = req.query;
    const filters = {};
    if (req.query.language) filters.languages = req.query.language.toUpperCase();
    if (req.query.specialty) filters.specialties = req.query.specialty.toUpperCase();
    if (availability && availability.length) filters.availableDays = { $in: availability };
    if (location) filters.location = { $near: { $geometry: location, $maxDistance: maxDistance, $minDistance: 0 } };
    if (minRate <= maxRate) filters.rate = { $gte: minRate, $lte: maxRate };
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
          requests: doc.requests
        });
      } catch (error) {
        console.error(
          'routes/pt.js found missing User doc: ' +
          error.message
        );
      }
    }
    return res.status(OK).send(matchDocs);
  } catch (err) {
    return res.status(BAD_REQUEST).send(err.message);
  }
});

router.post('/addptrequest', verifyToken, async (req, res) => {
  try {
    const pt_id = req.body.pt_id; // ID of PT that was requested
    const client_id = req.user.userId; // ID of client that made request
 
    Pt.findByIdAndUpdate(pt_id,
      {$push: {requests: client_id}},
      {safe: true, upsert: true},
      function(err,doc) {
        if(err){
          console.log(err);
        }else{
          return res.status(OK).send(client_id);
        }
      });
  }
  catch (err) {
    return res.status(BAD_REQUEST).send(err.message);
  }
  
});

router.post('/addclientrequest', verifyToken, async (req, res) => {
  try {
    const pt_id = req.body.pt_id; // ID of PT that was requested
    const client_id = req.user.userId; // ID of client that made request
    
    Client.findByIdAndUpdate(client_id,
      {$push: {requests: pt_id}},
      {safe: true, upsert: true},
      function(err,doc) {
        if(err){
          console.log(err);
        }else{
          return res.status(OK).send(pt_id);
        }
      });
  }
  catch (err) {
    return res.status(BAD_REQUEST).send(err.message);
  }
  
});

router.post('/getrequests', verifyToken, async (req, res) => {
  try {
    const id = req.user.userId;
    const doc = await Pt.findById(id);
    if (!doc) return res.status(NOT_FOUND).send();

    const requests = doc.requests;
    const names = [];
    for await (const docs of User.findById(requests)) {
      try {
        const user = await User.findById(docs._id);
        names.push(user.publicName);
      }
      catch (err) {
        console.error('/getrequests found missing User doc: ' +
        err.message)
      }
    }

    return res.status(OK).send(names);
  }
  catch (err) {
    return res.status(BAD_REQUEST).send(err.message);
  }
  
});

router.post('/acceptrequest', verifyToken, async (req, res) => {
  try {
    const id = req.user.userId;

    const doc = await Pt.findById(id);
    const requests = doc.requests;
    
    for await (const doc of User.findById(requests)) {
      try {
        if(doc.publicName == req.body.name) {
        
          // Update the PT's clients array to add the requesting client
          Pt.findByIdAndUpdate(id,
            {$push: {clients: doc._id}},
            {safe: true, upsert: true},
            function(err,doc) {
              if(err) {
                console.log(err);
              }
            });

          // Delete the client from the PT's request array
          Pt.findByIdAndUpdate(id,
            {$pull: {requests: doc._id}},
            {safe: true, upsert: true},
            function(err,doc) {
              if(err) {
                console.log(err);
              }
            });

          // Update the client's PT
          const clientDoc = await Client.findByIdAndUpdate(doc._id);
          clientDoc.pt = id;
          clientDoc.save();

          // Delete the PT from the client's requests array
          Client.findByIdAndUpdate(doc._id,
            {$pull: {requests: id}},
            {safe: true, upsert: true},
            function(err,doc) {
              if(err) {
                console.log(err);
              }
            });

          return res.status(OK);
        }
      }
      catch (err) {
        return res.status(BAD_REQUEST).send(err.message);
      }
  
    }
  return res.status(NOT_FOUND).send(err.message);
  }
  catch(err) {
    return res.status(NOT_FOUND).send(err.message); 
  }
   
});

router.post('/deleterequest', verifyToken, async (req, res) => {
  try {
    const id = req.user.userId;

    const doc = await Pt.findById(id);
    const requests = doc.requests;
    
    for await (const doc of User.findById(requests)) {
      try {
        if(doc.publicName == req.body.name) {
      
          // Delete the client from the PT's request array
          Pt.findByIdAndUpdate(id,
            {$pull: {requests: doc._id}},
            {safe: true, upsert: true},
            function(err,doc) {
              if(err) {
                console.log(err);
              }
            });

          // Delete the PT from the client's requests array
          Client.findByIdAndUpdate(doc._id,
            {$pull: {requests: id}},
            {safe: true, upsert: true},
            function(err,doc) {
              if(err) {
                console.log(err);
              }
            });

          return res.status(OK);
        }
      }
      catch (err) {
        return res.status(BAD_REQUEST).send(err.message);
      }
  
    }
  return res.status(NOT_FOUND).send(err.message);
  }
  catch(err) {
    return res.status(NOT_FOUND).send(err.message); 
  }
   
});

module.exports = router;
