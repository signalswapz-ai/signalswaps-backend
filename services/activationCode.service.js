const crypto = require('crypto');
const admin = require('../config/firebase/firebase');
const User = require('../models/authModel');

const usersCollection = admin.firestore().collection('users');
const CODE_TTL_MS = 15 * 60 * 1000;

class ActivationCodeService {
  async generateActivationCode(email) {
    const user = await User.findByEmail(email);
    if (!user) throw new Error('User not found');

    const code = String(crypto.randomInt(100000, 1000000));
    const expiresAt = admin.firestore.Timestamp.fromDate(
      new Date(Date.now() + CODE_TTL_MS)
    );

    await usersCollection.doc(user.id).update({
      activationCode: code,
      activationCodeExpiresAt: expiresAt,
      emailVerified: false,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return code;
  }
}

module.exports = new ActivationCodeService();