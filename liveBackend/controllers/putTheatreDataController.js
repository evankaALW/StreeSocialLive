const connection = require('../config/db');

const updateTheaterDetails = {
    updateTheaterData: async (req, res,next) => {
        const { id } = req.params; 
        try {
            const { pinCodesForAllocation } = req.body;

            const getQuery = `SELECT * from theatreTable where id = ${id}`;
            const value =  await connection.query(getQuery);
            console.log("pinCodesForAllocation",pinCodesForAllocation)
            if(value[0].length>0){
                const updateQuery = `UPDATE theatreTable SET pinCodesForAllocation = '${JSON.stringify(pinCodesForAllocation)}' WHERE id = ${id}`;
                const result =  await connection.query(updateQuery);
                if (result) {
                    res.status(200).json({ message: 'theatreTable updated successfully' });
    
                } else {
                    res.status(400).json({ message: 'Failed to update theatreTable' });
                }
            }
            
        } catch (error) {
            console.error('Error:', error);
            next(error);
        }
    }
};
module.exports = updateTheaterDetails;
