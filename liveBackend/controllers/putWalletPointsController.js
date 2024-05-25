const connection = require('../config/db');

const updateWalletPoints = {
    updatePoints : async(req,res) => {

        const { id } = req.params; 
        const { points } = req.body;
        try{
            const selectQuery = `SELECT * FROM walletTable WHERE userID = ${id}`;
            const selectResult = await connection.query(selectQuery);

            if(selectResult[0].length>0)
            {
                const updateQuery = `UPDATE walletTable SET value = ${points} WHERE userID = ${id}`;
                const updateResult = await connection.query(updateQuery);

                if(updateResult)
                {
                    return res.status(200).json({message:"Update walletTable successful"})
                }
            }
            else{
                return res.status(400).json({message:`Wallet Data for user ${id} not found`});
            }
        }
        catch(error){
            res.status(500).json({error:error});
        }

    }
}

module.exports = updateWalletPoints;