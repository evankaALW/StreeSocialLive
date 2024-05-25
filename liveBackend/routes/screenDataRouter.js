const express = require('express');
const errorHandler = require('../middleware/errorHandlingMiddleware');
const getScreenDetails = require('../controllers/getScreenDataController');

const screenDetailsRouter = express.Router();

screenDetailsRouter.get('/getScreenDetails/:selectedTheater',getScreenDetails.getScreenData);
screenDetailsRouter.use(errorHandler);

module.exports=screenDetailsRouter;
