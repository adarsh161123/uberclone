const express = require('express');
const router = express.Router();
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', captainController.registerCaptain);
router.post('/login', captainController.loginCaptain);
router.get('/logout', captainController.logoutCaptain);
router.get('/profile', authMiddleware, captainController.profileCaptain);
router.put('/toggle-availability', authMiddleware, captainController.toggleAvailability);

module.exports = router;