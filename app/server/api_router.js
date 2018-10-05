const express = require('express');
const router = express.Router();
const login_service = require('../services/login');
router.use(express.json());

router.use('/login', login_service);

module.exports = router
  //z8LzAyjpdk4tXpOI