const express = require('express');
const errorHandler = require('../middleware/errorHandlingMiddleware');
const authenticateApiKey = require('../middleware/authenticateAPIKEY');

const app = express();
const postLoginData = require('../controllers/postLoginData');
const postLoginDataRouter = express.Router();

//postLoginDataRouter.post('/login', authenticate, postLoginData.postLogin);
postLoginDataRouter.post('/login', authenticateApiKey, postLoginData.postLogin);

postLoginDataRouter.use(errorHandler);

module.exports=postLoginDataRouter;


