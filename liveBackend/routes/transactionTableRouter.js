const express = require('express');
const errorHandler = require('../middleware/errorHandlingMiddleware');
const postTransactionDetails = require('../controllers/postTransactionController');
const getTransactionDetails = require('../controllers/getTransactionController');
const transactionTableRouter= express.Router();
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

transactionTableRouter.post('/newTransaction/:id', authenticate,authorize('write'),postTransactionDetails.postTransactionData);
transactionTableRouter.get('/getTransactionDetails/:id',authenticate,authorize('read'),getTransactionDetails.transactionData);
transactionTableRouter.get('/getTransactionDetails',authenticate,authorize('read'),getTransactionDetails.transactionData);


transactionTableRouter.use(errorHandler);

module.exports=transactionTableRouter;

