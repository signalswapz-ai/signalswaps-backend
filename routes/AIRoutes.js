const express = require('express');
const router = express.Router();
const AIController = require('../controllers/AIController');
const { authenticate } = require('../middleware/auth');

// Public routes
router.post('/user-ai-history',authenticate, AIController.getUserAITradeHistory);
router.put('/new-trade',authenticate ,AIController.updateBalanceAiTrade);

module.exports = router;