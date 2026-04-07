const admin = require('../config/firebase/firebase');

const db = admin.firestore();
const usersCollection = db.collection('users');
const depositCollection = db.collection('deposit');

class DepositModel {
  static async userExistsByEmail(email) {
    const snap = await usersCollection.where('email', '==', email).limit(1).get();
    return !snap.empty;
  }

  static async create(data) {
    const docRef = await depositCollection.add({
      ...data,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    const doc = await docRef.get();
    return { id: doc.id, ...doc.data() };
  }

static async findByUserEmail(userEmail) {
  const snap = await depositCollection
    .where('userEmail', '==', userEmail)
    .orderBy('createdAt', 'desc')
    .get();

  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

}

module.exports = DepositModel;