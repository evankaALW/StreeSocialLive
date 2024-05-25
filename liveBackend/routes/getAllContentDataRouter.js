const express = require('express');
const errorHandler = require('../middleware/errorHandlingMiddleware');
const getAllContentDetails = require('../controllers/getAllContentDataController');
const allContentDataRouter = express.Router();

allContentDataRouter.get('/allContentData',getAllContentDetails.getAllContentData);
allContentDataRouter.use(errorHandler);

module.exports=allContentDataRouter;
