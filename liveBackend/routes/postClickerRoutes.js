const express = require('express');
const errorHandler = require('../middleware/errorHandlingMiddleware');
const addClickerData = require('../controllers/postClickerData');
const app = express();
const postClickerRoute = express.Router();


postClickerRoute.post('/addClickerData',addClickerData.postClicker);
postClickerRoute.use(errorHandler);

module.exports=postClickerRoute;
