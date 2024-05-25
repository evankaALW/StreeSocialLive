const connection = require('../config/db');

const postTheatreDetails = {
    postTheatreData: async(req,res,next) =>
        {
            try {
                const { theatreName, theatreId, theatreLocation, theatreCity, theatrePinCode, theatreOperatorEmail, theatreOperatorContact, 
                    theatreOperatorName, theatreOperatorIDproof, theaterScreens, totalScreens, rows, seatingCapacity, isDeleted, pinCodesForAllocation } = req.body;
                
                const selectQuery = `SELECT * FROM theatreTable WHERE id=${theatreId}`;

                var result = '';

                const selectResult = await connection.query(selectQuery);

                console.log("selectResult",selectResult)

                if(selectResult[0].length<=0){
                    console.log("theater add")
                    const pinCodeJSON = JSON.stringify(pinCodesForAllocation);
                    const query = `INSERT INTO theatreTable (id, theatreName, theatreLocation, theatreCity, theatrePinCode, theatreOperatorEmail, theatreOperatorContact, theatreOperatorName, theatreOperatorIDproof, theaterScreens, isDeleted, pinCodesForAllocation, createdAt, updatedAt)
                    VALUES (${theatreId}, '${theatreName}', '${theatreLocation}', '${theatreCity}', '${theatrePinCode}', '${theatreOperatorEmail}', '${theatreOperatorContact}', '${theatreOperatorName}', '${theatreOperatorIDproof}', ${totalScreens}, false, '${pinCodeJSON}', CONVERT_TZ(NOW(), '+00:00', '+05:30'), CONVERT_TZ(NOW(), '+00:00', '+05:30'))`;
                    let counter = 0;
                    result = await connection.query(query);
                    console.log(result)
                }

                if(result.length>0 || selectResult[0].length>0)
                        {
                            const screenQuery = `INSERT into screenTable (theatreID, seatingCapacity, screenDescription, screenNo, dateAndTime, isDeleted, createdAt, updatedAt)
                            VALUES(${theatreId}, ${seatingCapacity}, "Description for Screen of theatre ${theatreId}", ${theaterScreens}, CONVERT_TZ(NOW(), '+00:00', '+05:30'), ${isDeleted}, CONVERT_TZ(NOW(), '+00:00', '+05:30'), CONVERT_TZ(NOW(), '+00:00', '+05:30'))`;

                            const screenResult = await connection.query(screenQuery);
                            if(screenResult){
                                return res.status(200).json({"message":"Insert into theater and screen table successful"});
                            }
                        }
                        else{
                            return res.status(400).json({"message":"Error inserting entry into screen table"});
                        }

                
                   
              } catch (error) {
                console.error('Error executing MySQL query:', error);
                next(error);
              }
        }};
    
    module.exports = postTheatreDetails;