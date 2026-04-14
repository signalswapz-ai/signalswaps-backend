const jwt = require('jsonwebtoken');
const User = require('../models/authModel');
const { generateToken } = require('../utils/jwt');
const activationCodeService = require('./activationCode.service');

class AuthService {
  async register(email) {
    // Check if user exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create user
    const userData = {
      email
    };
    const user = await User.create(userData);
    return {
      user: {
        id: user.id,
        email: user.email
      }
    };
  }
   async verifyActivationCode(email, code) {
    const userSummary = await activationCodeService.verifyActivationCode(email, code);
    const user = await User.findByEmail(email);
    const token = generateToken(user);
    return {
      token,
      user: userSummary,
    };
  }
  async createPassword(email, password) {
    const user = await User.findByEmail(email);
    if (!user) {
      const err = new Error('User not found');
      err.statusCode = 404;
      throw err;
    }
    const updated = await User.updatePassword(email, password);
    return {
      user: {
        id: updated.id,
        email: updated.email,
      },
      message: 'Password created successfully',
    };
  }
  async login(email, password) {
    const user = await User.login( email, password );
    if (!user) {
      throw new Error('User not found');
    }
    const token = generateToken(user);
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      token: token,
      user:user
    };

}

 async forgotPassword(email) {
    const user = await User.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
    const expiresAt = Date.now() + 15 * 60 * 1000; // 15 min
    await User.setResetToken(user.id, rawToken, expiresAt);

    return {
      token: tokenHash,
      expiresAt
    };
  }

async resetPassword(email, password, confirmPassword) {
  // Validate passwords match
  if (password !== confirmPassword) {
    throw new Error('Passwords do not match');
  }

  // Check if user exists
  const user = await User.findByEmail(email);
  if (!user) {
    throw new Error('User not found');
  }

  // Update password
  await User.updatePassword(email, password);
  
  return {
    message: 'Password reset successfully'
  };
}

}
module.exports = new AuthService();