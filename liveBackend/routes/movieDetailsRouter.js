const express = require('express');
const errorHandler = require('../middleware/errorHandlingMiddleware');
const getMovieDetails = require('../controllers/getMovieDetailsController');
const updateMovieDetails = require('../controllers/putMovieDetailsController');
const deleteMovieDetails = require('../controllers/deleteMovieDetailsController');
const postMovieData = require('../controllers/postMovieDetailsController');
const movieDetailsRouter = express.Router();

movieDetailsRouter.get('/getMovieDetails',getMovieDetails.getMovieData);
movieDetailsRouter.put('/updateMovieDetails/:id',updateMovieDetails.updateMovieData)
movieDetailsRouter.delete('/deleteMovieDetails/:id', deleteMovieDetails.deleteMovieData)
movieDetailsRouter.post('/postMovieDetails',postMovieData.postMovie);
movieDetailsRouter.use(errorHandler);

module.exports=movieDetailsRouter;
