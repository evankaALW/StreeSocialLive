const connection = require('../config/db');

const getWalletDetails = {
    getWalletData : async (req, res,next) => {
        try{
            const { id } = req.params;
            if(id){
                const query = `SELECT * FROM walletTable where userID = ${id}`;

                const result = await connection.query(query);
        
                if(result)
                {
                    return res.status(200).json({walletDetails: result[0]})
                }
                else{
                    return res.status(400).json({message: "Wallet details not found"})
                }
            }
            else{
                const queryTwo = `SELECT * FROM walletTable`;
                const result = await connection.query(queryTwo);
                if(result)
                {
                    return res.status(200).json({walletDetails: result[0]})
                }
                else{
                    return res.status(400).json({message: "Wallet details not found"})
                }

            }
            
        }
        catch(error)
        {
            return res.status(500).json({message: error});
         }
    }
};

module.exports = getWalletDetails;