const connection = require('../config/db');

const getScreenDetails = {
    getScreenData : async (req, res,next) => {
        const {selectedTheater} = req.params;
        try{
            const query = `SELECT * FROM screenTable WHERE theatreID=${selectedTheater}`;

            const result = await connection.query(query);
    
            if(result)
            {
                return res.status(200).json({screenTable: result[0]})
            }
            
        }
        catch(error)
        {
            next(error); // Pass error to the next middleware       
         }
    }
};

module.exports = getScreenDetails;