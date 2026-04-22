const AIModel = require('../models/AIModel');

class AIService {
  async updateUserBalanceinAiTrade(AiTradeDuration, userAiEnteredAmount, userOldBalance, afterAITradeUserBalance, dailyROI, email, tradeDurationInDays) {
    const AITradeResult = {
      AiTradeDuration,
      userAiEnteredAmount,
      userOldBalance,
      afterAITradeUserBalance,
      dailyROI,
      email,
      tradeDurationInDays
    };

    const updatedUser = await AIModel.updateBalanceAndAiTrade(AITradeResult);
    return updatedUser;
  }
  async userAITradeHistory(email) {
    if (!email) {
      throw new Error('Email is required');
    }

    return AIModel.userAITradeHistory(email);
  }
}

module.exports = new AIService();