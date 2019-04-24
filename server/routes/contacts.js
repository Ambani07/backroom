const express = require('express');
const router = express.Router();
 
const UserCrlt = require('../controllers/user');

const ContactCrlt = require('../controllers/contact');

router.post('', UserCrlt.authMiddleware, ContactCrlt.createContact);

module.exports = router;