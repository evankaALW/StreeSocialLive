const connection = require('../config/db'); 

const userTableController = {
    getUserTable: async (req, res,next) => {
        try {
           
            const { id } = req.params;
            if (id) {                // Execute another query if id exists
                    const query = `SELECT * FROM userTable WHERE id = ${id}`;
                    const [result] = await connection.query(query);
                    if (result.length > 0) {
                        return res.status(200).json({ user: result[0] });
                    } else {
                        return res.status(404).json({ message: `Error retrieving getUserTable with id ${id}. Please try again` });
                    }
            }
            else{
                    const query = 'SELECT * FROM userTable';
                    const [results] = await connection.query(query);
                    if(results){
                        const filteredResults = results.map(user => {
                            return user; 
                        });

                        return res.status(200).json({ "All user details":filteredResults });
                    }
                    else{
                        return res.status(400).json({ error: 'Error retrieving all rows of getUserTable responses. Please try again.' });
                        }
        }
    }   catch (error) {
            console.error('Error executing getUserTable query:', error);
            next(error);
          }   
      },
  };
  module.exports = userTableController;