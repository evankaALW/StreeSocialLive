const connection = require('../config/db');

const postTransactionDetails = {
    postTransactionData: async (req, res,next) => {
        const { id } = req.params; 
        try {
            const { points, activityID } = req.body;
            const transactionQuery = `INSERT INTO transactionTable (id, userId, transactionDate, transactionAmount, itemID, itemType, quantity, transactionStatus, createdAt, updatedAt)
            VALUES (null, ${id}, NOW(), ${points}, ${activityID}, 'In-app Cashback Activity', 1, 'Successful', CONVERT_TZ(NOW(), '+00:00', '+05:30'), CONVERT_TZ(NOW(), '+00:00', '+05:30') )`

            const resultTransaction = await connection.query(transactionQuery);
            if(resultTransaction){
                res.status(200).json({ message: 'transactionTable updated successfully' });
            }
            else {
                res.status(400).json({ message: 'Failed to insert data into transactionTable' });
            }
        } catch (error) {
            console.error('Error:', error);
            next(error);
        }
    }
};
module.exports = postTransactionDetails;
