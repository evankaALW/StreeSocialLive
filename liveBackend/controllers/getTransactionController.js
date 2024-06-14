const connection = require('../config/db');

const getTransactionDetails = {
    transactionData : async (req, res,next) => {
        try{
            let query = ``;
            const { id } = req.params;
            if(id){
                    query = `SELECT * FROM transactionTable WHERE userId=${id}`;
                    
            }
            else{
                    query = `SELECT * FROM transactionTable`;
            }
            const result = await connection.query(query);
            
            if(result)
            {
                return res.status(200).json({transactionTable: result[0]})
            }
        }
        catch(error)
        {
            next(error); // Pass error to the next middleware       
        }
    }
};

module.exports = getTransactionDetails;