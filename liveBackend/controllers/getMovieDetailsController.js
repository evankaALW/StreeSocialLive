const connection = require('../config/db');

const getMovieDetails = {
    getMovieData : async (req, res,next) => {
        try{
            const query = `SELECT * FROM movietable`;

            const result = await connection.query(query);
    
            if(result)
            {
                return res.status(200).json({"movieData": result[0]})
            }
            
        }
        catch(error)
        {
            next(error);
        }
    }
};

module.exports = getMovieDetails;