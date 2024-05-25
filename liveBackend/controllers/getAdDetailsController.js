const connection = require('../config/db');

const getAdvertisementDetails = {
    getAdData : async (req, res,next) => {
        try{
            const query = `SELECT * FROM advertisementtable`;

            const result = await connection.query(query);
    
            if(result)
            {
                return res.status(200).json({adData: result[0]})
            }
            
        }
        catch(error)
        {
            next(error); // Pass error to the next middleware       
         }
    }
};

module.exports = getAdvertisementDetails;