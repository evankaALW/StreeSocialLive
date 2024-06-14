const express = require('express');
const errorHandler = require('../middleware/errorHandlingMiddleware');
const updateWalletAfterGame = require('../controllers/putWalletGameController');
const getWalletDetails = require('../controllers/getWalletController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const walletRouter = express.Router();

walletRouter.put('/updateWallet/:id', authenticate,authorize('write'),updateWalletAfterGame.updateWalletData);
walletRouter.get('/getWallet/:id',authenticate,authorize('read'),getWalletDetails.getWalletData);
walletRouter.get('/getWallet',authenticate,authorize('read'),getWalletDetails.getWalletData);

//walletRouter.use(errorHandler);

module.exports=walletRouter;
