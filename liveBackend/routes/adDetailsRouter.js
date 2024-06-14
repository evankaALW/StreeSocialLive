const express = require('express');
const errorHandler = require('../middleware/errorHandlingMiddleware');
const getAdvertisementDetails = require('../controllers/getAdDetailsController');
const updateAdvertisement = require('../controllers/putAdDetailsController');
const deleteAdvertisementDetails = require('../controllers/deleteAdDetailsController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

const adDetailsRouter = express.Router();

adDetailsRouter.get('/getAdvertisementDetails',getAdvertisementDetails.getAdData);
adDetailsRouter.put('/updateAdvertisement/:adId', updateAdvertisement.updateAdData);
adDetailsRouter.delete('/deleteAdvertisementDetails/:id', deleteAdvertisementDetails.deleteAdData);

adDetailsRouter.use(errorHandler);

module.exports=adDetailsRouter;
