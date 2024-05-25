const express = require('express');
const errorHandler = require('../middleware/errorHandlingMiddleware');
const updateUserDetails = require('../controllers/putLoginDataController');
const putLoginDataRouter = express.Router();

// Change the method from post to put
putLoginDataRouter.put('/updateLoginData/:id', updateUserDetails.updateUserData);
putLoginDataRouter.use(errorHandler);

module.exports = putLoginDataRouter;





