const connection = require('../config/db');
const { format } = require('date-fns');

const updateUserDetails = {
    updateUserData: async (req, res,next) => {
        const { id } = req.params; 
        try {
            const { userName, dateOfBirth, phoneNumber, emailID, photo, address, pinCode, loginPIN, languageSpoken } = req.body;
            let setClause = '';// Constructing the SET clause dynamically based on provided fields
            if (userName !== undefined) setClause += `userName = '${userName}', `;
            if (dateOfBirth !== undefined) setClause += `dateOfBirth = ${dateOfBirth}, `;
            if (phoneNumber !== undefined) setClause += `phoneNumber = ${phoneNumber}, `;
            if (photo !== undefined) setClause += `photo = '${photo}', `;
            if (address !== undefined) setClause += `address = '${address}', `;
            if (emailID !== undefined) setClause += `emailID = '${emailID}', `;
            if (pinCode !== undefined) setClause += `pinCode = ${pinCode}, `;
            if (loginPIN !== undefined) setClause += `loginPIN = ${loginPIN}, `;
            if (languageSpoken !== undefined) setClause += `languageSpoken = '${languageSpoken}', `;

            setClause += `updatedAt = CONVERT_TZ(NOW(), '+00:00', '+05:30') `

            setClause = setClause.replace(/,\s*$/, '');// Removing the trailing comma and space

            const updateQuery = `UPDATE userTable SET ${setClause} WHERE id = ${id}`;// Constructing the final update query
            const result = await connection.query(updateQuery);

            if (result) {
                res.status(200).json({ message: 'User updated successfully' });
            } else {
                res.status(400).json({ message: 'Failed to update user' });
            }
        } catch (error) {
            console.error('Error:', error);
            next(error);
        }
    }
};

module.exports = updateUserDetails;
