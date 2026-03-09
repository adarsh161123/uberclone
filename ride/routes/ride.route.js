const express = require('express');

const router = express.Router();
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middleware/authMiddleware');
router.post('/request', authMiddleware, rideController.requestRide);
router.get('/history', authMiddleware, rideController.rideHistory);
module.exports = router;
