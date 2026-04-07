const jwt = require('jsonwebtoken');
const User = require('../models/authModel');
const { generateToken } = require('../utils/jwt');

class AuthService {
  async register(email, password, name) {
    // Check if user exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create user
    const userData = {
      email,
      password: password,
      name
    };
    const user = await User.create(userData);
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
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