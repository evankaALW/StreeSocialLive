const connection = require('../config/db');

const updateScheduler = {
    updateSchedulerData: async (req, res,next) => {
        const { id } = req.params; 
        try {
            const { isDeleted } = req.body;
           let setClause = '';// Constructing the SET clause dynamically based on provided fields
           if (isDeleted !== undefined) setClause += `isDeleted = ${isDeleted}, `;
           setClause += `updatedAt = CONVERT_TZ(NOW(), '+00:00', '+05:30') `;
           setClause = setClause.replace(/,\s*$/, '');// Removing the trailing comma and space           

            const updateQuery = `UPDATE schedulerTable SET ${setClause} WHERE id = ${id}`;
            const result = await connection.query(updateQuery);
            if (result) {
                res.status(200).json({ message: 'schedulerTable updated successfully' });
            } else {
                res.status(400).json({ message: 'Failed to update schedulerTable' });
            }
        } catch (error) {
            console.error('Error:', error);
            next(error);
        }
    }
};
module.exports = updateScheduler;
