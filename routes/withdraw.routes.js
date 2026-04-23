const express = require('express');
const withdrawController = require('../controllers/withdraw.controller');
const { authenticate } = require('../middleware/auth');
const { apiRateLimiter } = require('../middleware/apiRateLimiter');
const router = express.Router();
// apiRateLimiter()
// routes
router.post('/create', authenticate, withdrawController.createWithdraw);
router.post('/list', authenticate,  withdrawController.getWithdrawsByUser);

module.exports = router;