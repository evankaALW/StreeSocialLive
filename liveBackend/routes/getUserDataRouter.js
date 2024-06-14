const express = require('express');
const errorHandler = require('../middleware/errorHandlingMiddleware');
const authenticateApiKey = require('../middleware/authenticateAPIKEY');
const authorize = require('../middleware/authorize');


const app = express();
const getUserTableController = require('../controllers/getUserTableController');
const userDataRouter = express.Router();

userDataRouter.get('/getLoginData/:id',authenticateApiKey,getUserTableController.getUserTable);
userDataRouter.get('/getLoginData',authenticateApiKey, getUserTableController.getUserTable);

userDataRouter.use(errorHandler);

module.exports=userDataRouter;



