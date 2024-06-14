const connection = require('../config/db');

const updateWalletAfterGame = {
    updateWalletData: async (req, res,next) => {
        const { id } = req.params; 
        try {
            const { points } = req.body;
            if(id){
                const getQuery = `SELECT value from walletTable where userID = ${id}`;
                const value =  await connection.query(getQuery);
                console.log(value)
                if(value[0][0].value>=0){
                    const totalPoints = value[0][0].value + (points)
                    console.log(value[0][0].value,totalPoints)
                    const updateQuery = `UPDATE walletTable SET value = ${totalPoints}, updatedDateTime =  CONVERT_TZ(NOW(), '+00:00', '+05:30') WHERE userID = ${id}`;
                    const result =  await connection.query(updateQuery);
                    if (result) {
                        res.status(200).json({ message: 'walletTable updated successfully' });
        
                    } else {
                        res.status(400).json({ message: 'Failed to update walletTable / transactionTable' });
                    }
                }
            }
        } catch (error) {
            console.error('Error:', error);
            next(error);
        }
    }
};
module.exports = updateWalletAfterGame;
