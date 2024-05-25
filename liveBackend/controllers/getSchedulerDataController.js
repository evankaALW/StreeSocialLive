const connection = require('../config/db');

const getSchedulerData = {
    schedulerData : async (req, res,next) => {
        try{
            const query = 'SELECT `id`, `theatreID`, `screenID`, `premiereDate`, `slotIndex`, `videoLinks`, `movieID`, `advertisementIDList`, `isDeleted`  FROM `schedulerTable` AS `schedulerData`';
            const scheduler = await connection.query(query);
            if(scheduler)
            {
                console.log("scheduler",scheduler)
                return res.status(200).json({schedulerData: scheduler})
            }
        }
        catch (error) {
            console.error('Error executing MySQL query:', error);
            next(error);
          }}
};

module.exports = getSchedulerData;