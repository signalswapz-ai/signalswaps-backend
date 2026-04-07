const { createWithdraw, getWithdrawsByUser } = require('../services/withdraw.service');

class WithdrawController {
  async createWithdraw(req, res, next) {
    try {
      const result = await createWithdraw(req.body);
      res.status(201).json({
        success: true,
        message: 'Withdraw created successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  async getWithdrawsByUser(req, res, next) {
    try {
      const { userEmail } = req.body;
      if (!userEmail?.trim()) {
        return res.status(400).json({ success: false, message: 'userEmail is required' });
      }
      const data = await getWithdrawsByUser(userEmail.trim());
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new WithdrawController();