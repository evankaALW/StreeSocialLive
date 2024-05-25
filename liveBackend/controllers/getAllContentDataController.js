const connection = require('../config/db');

const getAllContentDetails = {
    getAllContentData : async (req, res,next) => {
        try{
            const allContentQuery = {};
            const adQuery = `SELECT * FROM advertisementtable`;
            const result = await connection.query(adQuery);
            if(result[0])
            {
                allContentQuery.advertisements = result[0];// return res.status(200).json({adData: result[0]})
            }
            else{
                allContentQuery.advertisements = [];
            }
            const movieQuery = `SELECT * FROM movietable`;
            const resultTwo = await connection.query(movieQuery);
            if(resultTwo[0])
            {
                allContentQuery.movies = resultTwo[0];// return res.status(200).json({adData: result[0]})
            }
            else{
                allContentQuery.movies = [];
            }
            return res.status(200).json({allContentData: allContentQuery})
            
        }
        catch(error)
        {
            console.log("error in allContentData fetch", error);
            next(error);
        }
    }
};

module.exports = getAllContentDetails;