const express = require('express');
const errorHandler = require('../middleware/errorHandlingMiddleware');
const updateWalletAfterGame = require('../controllers/putWalletGameController');
const getWalletDetails = require('../controllers/getWalletController');

const walletRouter = express.Router();

walletRouter.put('/updateWallet/:id', updateWalletAfterGame.updateWalletData);
walletRouter.get('/getWallet/:id',getWalletDetails.getWalletData);
walletRouter.get('/getWallet',getWalletDetails.getWalletData);

//walletRouter.use(errorHandler);

module.exports=walletRouter;
