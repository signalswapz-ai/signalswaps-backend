const admin = require('../config/firebase/firebase');
const db = admin.firestore();
const usersCollection = db.collection('users');
const aiTradesCollection = db.collection('ai-trade-history');

class AIModel {
  static async updateBalanceAndAiTrade(AITradeResult) {
    const user = await usersCollection.where('email', '==', AITradeResult.email).get();
    if (user.empty) {
      throw new Error('User not found');
    }

    const userDoc = user.docs[0];
    const userRef = usersCollection.doc(userDoc.id);

    const AITradeDurationProcessDays = (tradeDurationInDays) => {
      const days = Number(tradeDurationInDays);
      if (!Number.isInteger(days) || days <= 0) {
        throw new Error('tradeDurationInDays must be a positive integer');
      }

      const now = new Date();
      const endDate = new Date(now);
      endDate.setDate(endDate.getDate() + days);
      return endDate;
    };

    const endDate = AITradeDurationProcessDays(AITradeResult.tradeDurationInDays);

    await db.runTransaction(async (transaction) => {
      transaction.update(userRef, {
        balance: AITradeResult.afterAITradeUserBalance,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      const tradeRef = aiTradesCollection.doc();
      transaction.set(tradeRef, {
        email: AITradeResult.email,
        tradeDuration: AITradeResult.AiTradeDuration, // e.g., "5 Days AI Trade"
        durationInDays: AITradeResult.tradeDurationInDays, // number
        amount: AITradeResult.userAiEnteredAmount,
        oldBalance: AITradeResult.userOldBalance,
        newBalance: AITradeResult.afterAITradeUserBalance,
        dailyROI: AITradeResult.dailyROI,
        status: "running",
        tradeEndDate: endDate,
        tradeCreatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    });

    const updatedUser = await userRef.get();
    return { id: updatedUser.id, ...updatedUser.data() };
  }

  static async userAITradeHistory(email) {
    const snap = await aiTradesCollection
      .where('email', '==', email)
      .orderBy('tradeCreatedAt', 'desc')
      .get();

    return snap.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        ...data,
        tradeEndDate: data.tradeEndDate?.toDate
          ? data.tradeEndDate.toDate().toISOString()
          : null,
        tradeCreatedAt: data.tradeCreatedAt?.toDate
          ? data.tradeCreatedAt.toDate().toISOString()
          : null
      };
    });
  }
}

module.exports = AIModel;