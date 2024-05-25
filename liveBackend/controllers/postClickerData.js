const connection = require("../config/db")

const postClickerData = {
    postClicker : async (req,res,next) => {
        try{
        var replaced = false;
        const { screenID, IPAddress, seatNo, isReplaced, dateTime, issueIfReplaced, macAddress } = req.body;
        
        const query =  `INSERT INTO clickerdevicedetailstable (id, screenID, IPAddress, seatNo, isReplaced, dateTime, issueIfReplaced, isDeleted, macAddress, createdAt, updatedAt) VALUES (null, ${screenID}, '${IPAddress}', ${seatNo}, ${isReplaced}, '${dateTime}', '${issueIfReplaced}', false, '${macAddress}', CONVERT_TZ(NOW(), '+00:00', '+05:30'), CONVERT_TZ(NOW(), '+00:00', '+05:30'))`;

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

module.exports = postClickerData;