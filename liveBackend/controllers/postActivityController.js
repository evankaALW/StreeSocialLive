const connection = require("../config/db")

const postActivityDetails = {
    postActivityData : async (req,res,next) => {
        try{
        var replaced = false;

        const { activityDetails, categoryDetails, cashBackImagesURL, cashbackAmount, dateTime, activityType, categoryType, brandName, gameURL} = req.body;
        
        const selectQuery = `SELECT id FROM brandTable WHERE brandName='${brandName}'`;

          const brandIDResult = await connection.query(selectQuery);
          const brandID = brandIDResult[0][0].id;
          
          if(brandID){
            console.log("BrandID fetched");

        const query =  `INSERT INTO activityCashbackTable (activityDetails, categoryDetails, cashBackImagesURL, cashbackAmount, dateAndTime, activityType, categoryType, brandID, createdAt, updatedAt, gameURL) VALUES 
        ('${activityDetails}', '${categoryDetails}', '${cashBackImagesURL}', ${cashbackAmount}, CONVERT_TZ(NOW(), '+00:00', '+05:30'), '${activityType}', '${categoryType}', '${brandID}', CONVERT_TZ(NOW(), '+00:00', '+05:30'), CONVERT_TZ(NOW(), '+00:00', '+05:30'), '${gameURL}')`;

        const results = await connection.query(query);

            if(results){
                res.status(200).json({ message:"200 OK INSERT INTO activityCashbackTable successful"});
            }
        }
    }
    catch(error){
        next(error);
    }
    }
};

module.exports = postActivityDetails;