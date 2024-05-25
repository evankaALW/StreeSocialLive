const connection = require('../config/db');

const updateAdvertisement = {
    updateAdData: async (req, res,next) => {
        const { adId } = req.params; 

        try {
            const { adVideoLink, totalOptionNumber, isDeleted, questionTableID } = req.body;

            let setClause = '';// Constructing the SET clause dynamically based on provided fields
            if (adVideoLink !== undefined) setClause += `adVideoLink = '${adVideoLink}', `;
            if (totalOptionNumber !== undefined) setClause += `totalOptionNumber = ${totalOptionNumber}, `;
            if (isDeleted !== undefined) setClause += `isDeleted = ${isDeleted}, `;
            if (questionTableID !== undefined) setClause += `questionTableID = ${questionTableID}, `
            setClause+= `updatedAt = CONVERT_TZ(NOW(), '+00:00', '+05:30') `;

            setClause = setClause.replace(/,\s*$/, '');// Removing the trailing comma and space

            const updateQuery = `UPDATE advertisementtable SET ${setClause} WHERE id = ${adId}`;// Construct your SQL update query
            const result = await connection.query(updateQuery);

            if (result) {
                res.status(200).json({ message: 'Advertisement updated successfully' });
            } else {
                res.status(400).json({ message: 'Failed to update advertisement' });
            }
        } catch (error) {
            console.error('Error:', error);
            next(error);
        }
    }
};

module.exports = updateAdvertisement;
