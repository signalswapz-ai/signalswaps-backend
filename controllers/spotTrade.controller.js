const { createSpotTrade, getSpotTradesByUser } = require('../services/spotTrade.service');

class SpotTradeController {

    //  Create Trade
    async createSpotTrade(req, res, next) {
        try {
            let { userEmail } = req.body;

            if (!userEmail?.trim()) {
                return res.status(400).json({
                    success: false,
                    message: 'userEmail is required'
                });
            }
            const result = await createSpotTrade({
                ...req.body,
                userEmail
            });

            res.status(201).json({
                success: true,
                message: 'Spot trade created successfully',
                data: result
            });

        } catch (error) {
            next(error);
        }
    }

    //  Get Trades by Email
    async getSpotTradesByUser(req, res, next) {
        try {
            let { userEmail } = req.body;

            if (!userEmail?.trim()) {
                return res.status(400).json({
                    success: false,
                    message: 'userEmail is required'
                });
            }
            const data = await getSpotTradesByUser(userEmail);

            res.status(200).json({
                success: true,
                data
            });

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new SpotTradeController();
