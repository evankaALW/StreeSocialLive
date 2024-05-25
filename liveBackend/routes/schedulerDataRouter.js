const express = require('express');
const errorHandler = require('../middleware/errorHandlingMiddleware');
const app = express();
const getSchedulerData = require('../controllers/getSchedulerDataController');
const postSchedulerDataController = require('../controllers/postSchedulerDataController');
const updateScheduler = require('../controllers/putSchedulerDataController');
const deleteSchedulerDetails = require('../controllers/deleteSchedulerDataController');
const schedulerDataRouter = express.Router();

schedulerDataRouter.get('/getSchedulerData',getSchedulerData.schedulerData);
schedulerDataRouter.post('/saveSchedulerData',postSchedulerDataController.saveSchedulerData);
schedulerDataRouter.put('/updateSchedulerData/:id',updateScheduler.updateSchedulerData);
schedulerDataRouter.delete('/deleteSchedulerData/:id',deleteSchedulerDetails.deleteSchedulerData);
schedulerDataRouter.use(errorHandler);

module.exports=schedulerDataRouter;
