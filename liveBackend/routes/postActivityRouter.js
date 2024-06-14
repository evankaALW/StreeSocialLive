const express = require('express');
const errorHandler = require('../middleware/errorHandlingMiddleware');
const postActivityDetails = require('../controllers/postActivityController');
const authenticateApiKey = require('../middleware/authenticateAPIKEY');
const postActivityRouter = express.Router();


postActivityRouter.post('/addActivityDetails',authenticateApiKey,postActivityDetails.postActivityData);
postActivityRouter.use(errorHandler);

module.exports=postActivityRouter;
