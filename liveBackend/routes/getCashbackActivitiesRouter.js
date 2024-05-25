const express = require('express');
const errorHandler = require('../middleware/errorHandlingMiddleware');
const getActivityCashbackDetails = require('../controllers/getCashbackActivitiesController');
const activityCashbackRouter = express.Router();

activityCashbackRouter.get('/getActivityCashback',getActivityCashbackDetails.getActivityCashbackData);
activityCashbackRouter.use(errorHandler);

module.exports=activityCashbackRouter;
