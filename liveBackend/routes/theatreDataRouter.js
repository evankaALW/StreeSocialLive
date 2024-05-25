const express = require('express');
const errorHandler = require('../middleware/errorHandlingMiddleware');
const getTheatreDetails = require('../controllers/getTheatreDataController');
const updateTheaterDetails = require('../controllers/putTheatreDataController');
const postTheatreDetails = require('../controllers/postTheatreDataController');

const theatreDetailsRouter = express.Router();

theatreDetailsRouter.get('/getTheatreDetails',getTheatreDetails.getTheatreData);
theatreDetailsRouter.post('/postTheatreData',postTheatreDetails.postTheatreData);
theatreDetailsRouter.put('/updateTheaterDetails/:id',updateTheaterDetails.updateTheaterData);

theatreDetailsRouter.use(errorHandler);

module.exports=theatreDetailsRouter;
