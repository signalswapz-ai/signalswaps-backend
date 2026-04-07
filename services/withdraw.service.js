const WithdrawModel = require('../models/withdraw.model');

const createWithdraw = async (payload) => {
  const email = payload.userEmail?.trim();
  if (!email) throw Object.assign(new Error('userEmail is required'), { statusCode: 400 });

  const ok = await WithdrawModel.userExistsByEmail(email);
  if (!ok) {
    const err = new Error('User not found');
    err.statusCode = 404;
    throw err;
  }

  return WithdrawModel.create(payload);
};

const getWithdrawsByUser = async (userEmail) => {
  return WithdrawModel.findByUserEmail(userEmail);
};

module.exports = { createWithdraw, getWithdrawsByUser };