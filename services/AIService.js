const AIModel = require('../models/AIModel');

class AIService {
  async updateUserBalanceinAiTrade(AiTradeDuration, userAiEnteredAmount, userOldBalance, afterAITradeUserBalance, dailyROI, userEmail, tradeDurationInDays) {
    const AITradeResult = {
      AiTradeDuration,
      userAiEnteredAmount,
      userOldBalance,
      afterAITradeUserBalance,
      dailyROI,
      userEmail,
      tradeDurationInDays
    };

    const updatedUser = await AIModel.updateBalanceAndAiTrade(AITradeResult);
    return updatedUser;
  }
  async userAITradeHistory(userEmail) {
    if (!userEmail) {
      throw new Error('Email is required');
    }

    return AIModel.userAITradeHistory(userEmail);
  }
}

module.exports = new AIService();