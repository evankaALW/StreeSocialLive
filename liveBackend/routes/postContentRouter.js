const express = require('express')
const errorHandler = require('../middleware/errorHandlingMiddleware');
const app = express();
const postContentDetails = require('../controllers/postContentController');
const postContentRouter = express.Router();

postContentRouter.post('/addContentData',postContentDetails.postContentData);
postContentRouter.use(errorHandler);

module.exports=postContentRouter;
