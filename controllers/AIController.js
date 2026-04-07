const AIService = require('../services/AIService');
const admin = require('../config/firebase/firebase');

class AIController {
  async updateBalanceAiTrade(req, res, next) {
    try {
      const { AiTradeDuration, userAiEnteredAmount, userOldBalance, afterAITradeUserBalance, dailyROI, userEmail, tradeDurationInDays } = req.body;
      const result = await AIService.updateUserBalanceinAiTrade(AiTradeDuration, userAiEnteredAmount, userOldBalance, afterAITradeUserBalance, dailyROI, userEmail, tradeDurationInDays);
      res.status(201).json({
        success: true,
        message: 'Your AI trade has been completed successfully. The result has been reflected in your account balance, and you can view full details in your AI trade history.',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }
  async getUserAITradeHistory(req, res, next) {
    try {
      const { userEmail } = req.body;
      const result = await AIService.userAITradeHistory(userEmail);
      res.status(200).json({
        success: true,
        message: 'User AI trade history retrieved successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

}

module.exports = new AIController();