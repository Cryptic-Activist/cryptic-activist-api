const express = require('express');

const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, () => {
  console.log('Homepage');
});

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  const request = req.body;
  console.log(request);
  res.status(200).send({
    msg: 'User was successfully logged in',
  });
});

module.exports = router;
