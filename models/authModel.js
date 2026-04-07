const admin = require('../config/firebase/firebase');

const db = admin.firestore();
const usersCollection = db.collection('users');

class User {
  static async create(userData) {
    // Define defaults that should NEVER be overridden by userData
    const defaults = {
      balance: 0,
      totalDeposit: 0,
      totalWithdrawal: 0,
      todayPnl: 0,
      todayGain: 0,
      profit:"down",
      holdings: [],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    // Extract only allowed fields from userData (security: prevent field injection)
    const allowedFields = { };

    if (userData.email !== undefined) allowedFields.email = userData.email;
    if (userData.password !== undefined) allowedFields.password = userData.password;
    if (userData.name !== undefined) allowedFields.name = userData.name;
    if (userData.photoUrl !== undefined) allowedFields.photoUrl = userData.photoUrl;
    if (userData.googleId !== undefined) allowedFields.googleId = userData.googleId;
    if (userData.provider !== undefined) allowedFields.provider = userData.provider;
    if (userData.lastLogin !== undefined) allowedFields.lastLogin = userData.lastLogin;
  

    // Merge: defaults first, then allowed fields (defaults can't be overridden)
    const docRef = await usersCollection.add({
      ...defaults,
      ...allowedFields
    });

    const doc = await docRef.get();
    return {
      id: doc.id,
      ...doc.data()
    };
  }

  static async findByEmail(email) {
    const user = await usersCollection.where('email', '==', email).get();
    if (user.empty) {
      return null; 
    }
    return {
      id: user.docs[0].id,
      ...user.docs[0].data()
    };
  }

  static async login(email, password) {
    const user = await usersCollection.where('email', '==', email).get();
    if (user.empty) {
      throw new Error('Email not found');
    }
    
    const userDoc = user.docs[0];
    const userData = userDoc.data();
    
    // Verify password (plain text comparison - TODO: Implement bcrypt)
    if (userData.password !== password) {
      throw new Error('Invalid password');
    }
    
    return {
      id: userDoc.id,
      ...userData
    };
  }
  static async updateLastLogin(email) {
    const userQuery = await usersCollection.where('email', '==', email).get();
    if (userQuery.empty) {
      throw new Error('User not found');
    }
    
    const userDoc = userQuery.docs[0];
    await userDoc.ref.update({
      lastLogin: admin.firestore.FieldValue.serverTimestamp(),
    });
    
    return userDoc.ref.get();
  }

  static async updatePassword(email, newPassword) {
    const userQuery = await usersCollection.where('email', '==', email).get();
    if (userQuery.empty) {
      throw new Error('User not found');
    }
    
    const userDoc = userQuery.docs[0];
    await userDoc.ref.update({
      password: newPassword,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    const updatedDoc = await userDoc.ref.get();
    return {
      id: updatedDoc.id,
      ...updatedDoc.data()
    };
  }
}

module.exports = User;