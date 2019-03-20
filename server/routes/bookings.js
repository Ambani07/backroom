const express = require('express');
const router = express.Router();
 
const UserCrlt = require('../controllers/user');

const BookingCrlt = require('../controllers/booking');

router.post('', UserCrlt.authMiddleware, BookingCrlt.createBooking);

module.exports = router;