const connection = require('../config/db');

const deleteSchedulerDetails = {
    deleteSchedulerData: async (req, res,next) => {
        try {
            const { id } = req.params;
            const query = `DELETE FROM schedulerTable WHERE id = ${id}`;
            const result = await connection.query(query);
            if (result) {
                return res.status(200).json({ message: `schedulerTable row of id ${id} deleted successfully` });
            }
        } catch (error) {
            next(error); // Pass error to the next middleware
                }
    }
};


module.exports = deleteSchedulerDetails;
