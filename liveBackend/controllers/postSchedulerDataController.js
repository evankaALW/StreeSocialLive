const connection = require('../config/db');

const postSchedulerDataController = {
    saveSchedulerData: async(req,res,next) =>
    {
        try {
            const schedulerData = req.body;
            console.log(schedulerData);
            var screenId;
            schedulerData.video_links = JSON.stringify(schedulerData.video_links);
            schedulerData.sizes_of_video = JSON.stringify(schedulerData.sizes_of_video);
            console.log(schedulerData);//id, theatreID, screenID, startDate, slotIndex, videoLinks, movieID, advertisementIDList, isDeleted, createdAt, updatedAt
            
            const selectScreen = `SELECT id FROM screenTable where theatreID=${schedulerData.theatre_id} and screenNo=${schedulerData.screen_id}`;
            
            const selectResult = await connection.query(selectScreen);

            if(selectResult[0][0].id){
              screenId=selectResult[0][0].id;
              
            }
            const query = `INSERT INTO schedulerTable( theatreID, screenID, premiereDate, premiereTime, slotIndex, videoLinks, videoLinksSize,
                movieID, advertisementIDList, isDeleted, createdAt, updatedAt) VALUES 
                (${schedulerData.theatre_id},${screenId},'${schedulerData.premiereDate}','${schedulerData.premiereTime}',${schedulerData.slot_index},'${schedulerData.video_links}',
                '${schedulerData.sizes_of_video}',${schedulerData.movie_id}, '${schedulerData.advertisementIDList}',false,CONVERT_TZ(NOW(), '+00:00', '+05:30'),CONVERT_TZ(NOW(), '+00:00', '+05:30'))`;
                
            const results = await connection.query(query);
        
            console.log('Data inserted successfully into schedulerTable');
            if(results){
              return res.status(200).json('Data inserted successfully into schedulerTable');
            }
          } catch (error) {
            console.error('Error executing MySQL query:', error);
            next(error);
          }
    }};

module.exports = postSchedulerDataController;