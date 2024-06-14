const express = require('express');
const errorHandler = require('../middleware/errorHandlingMiddleware');
const authenticateApiKey = require('../middleware/authenticateAPIKEY');
const postRegistrationData = require('../controllers/postRegistrationData');
const postRegistrationRouter = express.Router();

postRegistrationRouter.post('/registerUser',authenticateApiKey,postRegistrationData.postRegistration);
postRegistrationRouter.use(errorHandler);

module.exports=postRegistrationRouter;
