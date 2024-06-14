const express = require('express');
const errorHandler = require('../middleware/errorHandlingMiddleware');
const brandDetails = require('../controllers/getBrandDetailsController');
const brandDetailsRouter = express.Router();
const authenticateApiKey = require('../middleware/authenticateAPIKEY');

brandDetailsRouter.get('/getBrandDetails',authenticateApiKey, brandDetails.brandData);//brandDetails
brandDetailsRouter.use(errorHandler);

module.exports=brandDetailsRouter;
