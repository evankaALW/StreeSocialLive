const express = require('express');
const errorHandler = require('../middleware/errorHandlingMiddleware');
const getActivityCashbackDetails = require('../controllers/getCashbackActivitiesController');
const activityCashbackRouter = express.Router();
const authenticateApiKey = require('../middleware/authenticateAPIKEY');

activityCashbackRouter.get('/getActivityCashback',authenticateApiKey,getActivityCashbackDetails.getActivityCashbackData);
activityCashbackRouter.use(errorHandler);

module.exports=activityCashbackRouter;
