const connection = require('../config/db');

const getActivityCashbackDetails = {
    getActivityCashbackData : async (req, res,next) => {
        try{
            const query = `SELECT * FROM activityCashbackTable`;

            const result = await connection.query(query);
    
            if(result)
            {
                return res.status(200).json({"activitycashbacktable": result[0]})
            }
        }
        catch(error)
        {
            next(error);
        }
    }
};

module.exports = getActivityCashbackDetails;