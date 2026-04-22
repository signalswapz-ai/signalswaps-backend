const express = require('express');
const router = express.Router();
const AIController = require('../controllers/AIController');
const { authenticate } = require('../middleware/auth');

// Public routes
router.post('/user-ai-history',authenticate, AIController.getUserAITradeHistory);
router.post('/create',authenticate,AIController.updateBalanceAiTrade);
module.exports = router;