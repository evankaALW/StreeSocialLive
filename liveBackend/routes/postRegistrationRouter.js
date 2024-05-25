const express = require('express');
const errorHandler = require('../middleware/errorHandlingMiddleware');
//const authenticationMiddleware = require('../middleware/authenticationMiddleware');

const app = express();
const postRegistrationData = require('../controllers/postRegistrationData');
const postRegistrationRouter = express.Router();

postRegistrationRouter.post('/registerUser',postRegistrationData.postRegistration);
postRegistrationRouter.use(errorHandler);

module.exports=postRegistrationRouter;
