const express = require('express');
const errorHandler = require('../middleware/errorHandlingMiddleware');
const updateUserDetails = require('../controllers/putLoginDataController');
const putLoginDataRouter = express.Router();
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// Change the method from post to put
putLoginDataRouter.put('/updateLoginData/:id',  authenticate,authorize('write'),updateUserDetails.updateUserData);
putLoginDataRouter.use(errorHandler);

module.exports = putLoginDataRouter;





