const connection = require('../config/db');
const { format } = require('date-fns');

const updateMovieDetails = {
    updateMovieData: async (req, res,next) => {
        const { id } = req.params; 

        try {
            const { isDeleted, isExpired, startDate, endDate } = req.body;

            let setClause = '';// Constructing the SET clause dynamically based on provided fields
            if (isDeleted !== undefined) setClause += `isDeleted = ${isDeleted}, `;
            if (isExpired !== undefined) setClause += `isExpired = ${isExpired}, `;
            if (startDate !== undefined) setClause += `startDate = '${format(new Date(startDate), "yyyy-MM-dd'T'HH:mm:ss")}', `;
            if (endDate !== undefined) setClause += `endDate = '${format(new Date(endDate), "yyyy-MM-dd'T'HH:mm:ss")}', `;

            setClause+= `updatedAt = CONVERT_TZ(NOW(), '+00:00', '+05:30') `

            setClause = setClause.replace(/,\s*$/, '');// Removing the trailing comma and space

            const updateQuery = `UPDATE movieTable SET ${setClause} WHERE movieID = ${id}`;// Constructing the final update query
            const result = await connection.query(updateQuery);

            if (result) {
                res.status(200).json({ message: 'Movie updated successfully' });
            } else {
                res.status(400).json({ message: 'Failed to update movie' });
            }
        } catch (error) {
            console.error('Error:', error);
            next(error);
        }
    }
};

module.exports = updateMovieDetails;
