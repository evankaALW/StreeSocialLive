const connection = require('../config/db');

const brandDetails = async ( req, res,next ) =>{
    try{
        const query =  `SELECT DISTINCT * FROM brandTable`;
        const results =  await connection.query(query);

        if(results){
            console.log(results)
                return res.status(200).json({brandDetails: results[0]})
        }else {
            return res.status(404).json({ message: 'No data found' });
        }
    }
    catch(error){
        next(error);
    }    
};

module.exports = brandDetails;