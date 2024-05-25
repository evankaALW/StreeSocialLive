const connection = require("../config/db")

const postMovieData = {
    postMovie : async (req,res,next) => {
        try{
        var replaced = false;
        const { movie_id, movieName, movieDesc, movieRuntime, 
            intervalTime, productionHouse, dateTime, startDate, endDate, posterImage,  isDeleted, 
            isExpired } = req.body;

            console.log(req.body);
        //, , , movieURLPartOne, movieURLPartOneSize, movieURLPartTwo, movieURLPartTwoSize, movieRuntime, intervalTime, productionHouse, dateTime, startDate, endDate, posterImage, displayToggle, userResponseToggle, isDeleted, isExpired, createdAt, updatedAt
        const query =  `INSERT INTO movieTable (movieName, movieDesc, movieURLPartOne, movieURLPartOneSize, movieURLPartTwo, movieURLPartTwoSize, movieRuntime, 
            intervalTime, productionHouse, dateTime, startDate, endDate, posterImage, displayToggle, userResponseToggle, isDeleted, 
            isExpired, createdAt, updatedAt) 
        VALUES ('${movieName}', '${movieDesc}','',0, '', 0,  ${movieRuntime}, ${intervalTime}, '${productionHouse}' ,CONVERT_TZ(NOW(), '+00:00', '+05:30'), '${startDate} 00:00:00', '${endDate} 00:00:00', '', 
        0, 1, false, false, CONVERT_TZ(NOW(), '+00:00', '+05:30'), CONVERT_TZ(NOW(), '+00:00', '+05:30'))`;

        const results = await connection.query(query);

        if(results){
            res.status(200).json({ message:"200 OK postClickerData successful"});
        }
    }
    catch(error){
        next(error);
    }
    }
};

module.exports = postMovieData;