const express = require('express');
const errorHandler = require('../middleware/errorHandlingMiddleware');
const authenticate = require('../middleware/authLoginMiddleware');

const app = express();
const postLoginData = require('../controllers/postLoginData');
const postLoginDataRouter = express.Router();

//postLoginDataRouter.post('/login', authenticate, postLoginData.postLogin);
postLoginDataRouter.post('/login', postLoginData.postLogin);

postLoginDataRouter.use(errorHandler);

module.exports=postLoginDataRouter;


