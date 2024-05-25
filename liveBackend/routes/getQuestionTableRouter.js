const express = require('express');
const errorHandler = require('../middleware/errorHandlingMiddleware');
const getQuestionTableDetails = require('../controllers/getQuestionTableController');
const questionTableRouter = express.Router();

questionTableRouter.get('/getQuestionDetails',getQuestionTableDetails.getQuestionData);
questionTableRouter.use(errorHandler);

module.exports=questionTableRouter;
