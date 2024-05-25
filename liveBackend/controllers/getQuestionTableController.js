const connection = require('../config/db');

const getQuestionDetails = {
    getQuestionData : async (req, res,next) => {
        try{
            const query = `SELECT * FROM questionTable`;

            const result = await connection.query(query);
    
            if(result[0][0])
            {
                return res.status(200).json({"questionData": result[0]})
            }
            
        }
        catch(error)
        {
            next(error);
        }
    }
};

module.exports = getQuestionDetails;