const connection = require('../config/db'); // Assuming you have a database configuration file
const SECRET_KEY = "loginSuccessfulStreeS";//add in .env file

const postRegistrationData ={
    postRegistration: async (req, res,next) => {
    var brandID, theatreID;
    const { userName, dateOfBirth, phoneNumber, emailID, photo, cardID, address, pinCode, languageSpoken, loginPIN, brand, theatre, pinCodesForAllocation
  } = req.body;

  try {
    const queryOne = `SELECT id from brandTable WHERE brandName = '${brand}'`;
    const [brandIDJSON] = await connection.query(queryOne);
    brandID = brandIDJSON[0].id;
    console.log(brandID)
    if(brandID){

        // const theatrePinQuery = `SELECT id, pinCodesForAllocation FROM theatreTable`;
        // const theatrePinResult = await connection.query(theatrePinQuery);
        // if(theatrePinResult[0])
        //   {
        //       for (let i = 0; i < theatrePinResult[0].length; i++) {
        //         const row = theatrePinResult[0][i];
        //         if(row.pinCodesForAllocation){
        //           // Parsing the string value of pinCodesForAllocation into JSON
        //         const pinCodes = JSON.parse(row.pinCodesForAllocation);
        //         if (pinCodes.includes(pinCode)) {// If yes, store the associated id in the theatreID variable and break the loop
        //           theatreID = row.id;
        //           console.log("theatre id found", theatreID)
        //           break;
        //         }
        //         }
        //       }
        //   }
        console.log("brandID : ",brandID)
        console.log("req", req.body)
        const queryTwo = `INSERT INTO userTable ( id, userName, dateOfBirth, phoneNumber, emailID, photo, cardID, address, pinCode, languageSpoken, loginPIN, brandID, theatreID, dateTime, isDeleted, createdAt, updatedAt )
    VALUES ( null, '${userName}', '${dateOfBirth}', ${phoneNumber}, '${emailID}', '${photo}', ${cardID}, '${address}', ${pinCode}, '${languageSpoken}', ${loginPIN}, ${brandID}, 1, CONVERT_TZ(NOW(), '+00:00', '+05:30'), false, CONVERT_TZ(NOW(), '+00:00', '+05:30'), CONVERT_TZ(NOW(), '+00:00', '+05:30'))`;

    const [result, metadata ]= await connection.query(queryTwo);
    const userId = result;
    console.log(result,"result")
    if(userId){
      const queryThree = `insert into walletTable (id, userID, value, dateAdded, updatedDateTime, createdAt, updatedAt) VALUES ( NULL, ${userId}, 0, CONVERT_TZ(NOW(), '+00:00', '+05:30'), CONVERT_TZ(NOW(), '+00:00', '+05:30'), CONVERT_TZ(NOW(), '+00:00', '+05:30'), CONVERT_TZ(NOW(), '+00:00', '+05:30'))`;

      const resultThree = await connection.query(queryThree);
      if(resultThree)
      {
          res.status(200).json({ message:"Registration successful"});
      }
     }
    }
    else{
      console.log('brandId not found')
    }
  } catch (error) {
    console.error(error);
    next(error);
  }}};

  module.exports = postRegistrationData;