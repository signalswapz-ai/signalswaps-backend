const User = require('../models/authModel');
const SpotTradeModel = require('../models/spotTrade.model');

class SpotTradeService {
  async createSpotTrade(data) {
    const email = data.userEmail;
    if (!email) {
      const err = new Error('userEmail is required');
      err.statusCode = 400;
      throw err;
    }
    
    const user = await User.findByEmail(data.userEmail);
    if (!user) {
      const err = new Error('User not found');
      err.statusCode = 404;
      throw err;
    }

    return SpotTradeModel.create({
      userEmail: email,
      coinname: data.coinname,
      balance: data.balance,
      todayPnl: data.todayPnl,
      todayGain: data.todayGain,
      timing: data.timing,
      direction: data.direction,
      date: data.date
    });
  }

  async getSpotTradesByUser(userEmail) {
    const email = userEmail;
    if (!email) {
      const err = new Error('userEmail is required');
      err.statusCode = 400;
      throw err;
    }
    return SpotTradeModel.findByUserEmail(email);
  }
}

module.exports = new SpotTradeService();