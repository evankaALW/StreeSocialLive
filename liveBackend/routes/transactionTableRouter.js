const express = require('express');
const errorHandler = require('../middleware/errorHandlingMiddleware');
const postTransactionDetails = require('../controllers/postTransactionController');
const transactionTableRouter= express.Router();

transactionTableRouter.post('/newTransaction/:id', postTransactionDetails.postTransactionData);

transactionTableRouter.use(errorHandler);

module.exports=transactionTableRouter;
