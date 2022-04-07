const express = require('express');
const router = express.Router();

const axios = require('axios');

const User = require('../models/User');

const { OK, BAD_REQUEST, UNAUTHORIZED, FORBIDDEN, NOT_FOUND, CONFLICT } = require('../../util/constants').STATUS_CODES;