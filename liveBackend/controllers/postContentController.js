const connection = require('../config/db');

const postContentDetails = {
    postContentData : async (req, res,next) => {
        try{
        var brandID;
        var questionID = 0;
        var imageName;
        const userResponseToggle = 1;
        const displayToggle = 0;
        const isDeleted = false;

        var { adVideoLink, advertisementName, adVideoLinkSize, questionType, imageURL, questionTypeID, videoType, isQuestionExists, questionDescription, questionTableID, option, videoURL, 
            padx1, padx2, padx3, padx4, padx5, pady1, pady2, pady3, pady4, pady5, text1, x1, x2, x3, x4, x5, y1, y2, y3, y4, y5, 
            colours, duration, adStartTime,  optionOne, optionTwo, optionThree,
            optionFour, optionFive, correctOption, brandIDForm, isSample, sampleID, movieName, movieURLPartOne, movieURLPartTwo,movieURLPartOneSize,movieURLPartTwoSize
          } = req.body;
 
          if(videoType == "Advertisement"){
          switch (option) {
            case 2:
              console.log("2",option)
              padx3=null;
              padx4=null;
              padx5=null;
              x3=null;
              x4=null;
              x5=null;
              pady3=null;
              pady4=null;
              pady5=null;
              y3=null;
              y4=null;
              y5=null;
              break;
            case 3:
              console.log("3",option)
              padx4=null;
              padx5=null;
              x4=null;
              x5=null;
              pady4=null;
              pady5=null;
              y4=null;
              y5=null;
              break;
            case 4:
              console.log("4",option)
              padx5=null;
              x5=null;
              pady5=null;
              y5=null;
              console.log("4",padx5,option)
              break;
            case 5:
              console.log("5",option)
              break;
          }

          const selectQuery = `SELECT * FROM brandTable WHERE id='${brandIDForm}'`;
          const brandIDResult = await connection.query(selectQuery);
          if(brandIDResult[0].length>0)
            {
              brandID = brandIDResult[0][0].id;
            }
            if(isQuestionExists)
            {
              questionID = questionTableID;
            }
            else if(!isQuestionExists){

              const insertQuestionQuery = `INSERT INTO questionTable ( questionDescription, optionOne, optionTwo, optionThree, optionFour,
                optionFive, imageURL, font, imageName, correctOption, padx1, padx2, padx3, padx4, padx5, x1, x2, x3, x4, x5, pady1, pady2,
                pady3, pady4, pady5, y1, y2, y3, y4, y5, createdAt, updatedAt) VALUES ('${questionDescription}', '${optionOne}', '${optionTwo}', '${optionThree}', '${optionFour}', '${optionFive}',
                  '${imageURL}','${text1}', '${imageURL}', '${correctOption}', ${padx1}, ${padx2}, ${padx3}, ${padx4}, ${padx5}, ${x1}, ${x2}, ${x3}, ${x4}, ${x5},
                  ${pady1},${pady2},${pady3}, ${pady4}, ${pady5},${y1},${y2}, ${y3}, ${y4}, ${y5}, CONVERT_TZ(NOW(), '+00:00', '+05:30'), CONVERT_TZ(NOW(), '+00:00', '+05:30'))`;

              const [questionResult]= await connection.query(insertQuestionQuery);
                console.log(questionResult)
              if(questionResult)
                {
                  questionID = questionResult;//insert statement returns new id after success
                }
            }
          
          if(brandID && questionID) {                
               const insertAdQuery = `INSERT INTO advertisementTable (adVideoLink, advertisementName, adFileSize, totalOptionNumber, questionTableID, userResponseToggle, displayToggle, brandID, duration, adStartTime, isSample, isDeleted, createdAt, updatedAt )
               VALUES ('${adVideoLink}', '${advertisementName}', ${adVideoLinkSize}, ${option}, ${questionID}, ${userResponseToggle}, ${displayToggle}, ${brandID}, ${duration}, ${adStartTime}, ${isSample}, ${isDeleted}, CONVERT_TZ(NOW(), '+00:00', '+05:30'),CONVERT_TZ(NOW(), '+00:00', '+05:30'))`;

               const resultAD = await connection.query(insertAdQuery);
               if(resultAD){
                console.log("Advertisement insert successful")
               }
               else{
                console.log("Error while insering data into advertisementTable")
              }
            }else{
              console.log("Brand ID/Question ID not found",brandID,questionID);
            }//brandID
          }//videoType == Ad
        else if (videoType == "Content"){

                const selectMovieQuery = `SELECT movieID FROM movieTable WHERE movieName='${movieName}'`;//date of premiere also you put

                const movieIDResult = await connection.query(selectMovieQuery);
                movieID = movieIDResult[0][0].movieID;


                const insertMovieQuery = `UPDATE movieTable SET movieURLPartOne = '${movieURLPartOne}', movieURLPartTwo = '${movieURLPartTwo}', 
                movieURLPartOneSize = ${movieURLPartOneSize}, movieURLPartTwoSize = ${movieURLPartTwoSize}, displayToggle = 0, userResponseToggle = 1, updatedAt = CONVERT_TZ(NOW(), '+00:00', '+05:30') WHERE movieID = ${movieID};`;

               const resultMovie = await connection.query(insertMovieQuery);

               if(resultMovie) {
                console.log("Advertisement insert successful")
               }else{
                console.log("Error while insering data into movieTable")
               }
              }
             
          return res.status(200).json({"message":"Data saved successfully"})
        }catch(error){
          next(error);
        }
    }
};
module.exports = postContentDetails;
