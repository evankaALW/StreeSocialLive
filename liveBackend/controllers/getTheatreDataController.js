const connection = require('../config/db');

const getTheatreDetails = {
    getTheatreData : async (req, res,next) => {
        try{
            const query = `SELECT * FROM theatreTable`;

            const result = await connection.query(query);
    
            if(result)
            {
                return res.status(200).json({theatreTable: result[0]})
            }
            
        }
        catch(error)
        {
            next(error); // Pass error to the next middleware       
         }
    }
};

module.exports = getTheatreDetails;