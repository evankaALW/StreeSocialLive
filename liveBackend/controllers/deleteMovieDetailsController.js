const connection = require('../config/db');

const deleteMovieDetails = {
    deleteMovieData: async (req, res,next) => {
        try {
            const { id } = req.params;
            const query = `DELETE FROM movieTable WHERE movieID = ${id}`;
            const result = await connection.query(query);

            if (result) {
                return res.status(200).json({ message: `movieTable row of id ${id} deleted successfully` });
            }
        } catch (error) {
            next(error); // Pass error to the next middleware        \
        }
    }
};


module.exports = deleteMovieDetails;
