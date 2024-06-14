const cors = require('cors'); // Import the cors middleware
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const postLoginDataRouter = require('./routes/postLoginDataRouter');
const getUserDataRouter = require('./routes/getUserDataRouter');
const postClickerRoute = require('./routes/postClickerRoutes');
const postRegistrationRouter = require('./routes/postRegistrationRouter')
const postContentRouter = require('./routes/postContentRouter')
const brandDetailsRouter = require('./routes/getBrandDetailsRoute');
const adDetailsRouter = require('./routes/adDetailsRouter');
const movieDetailsRouter = require('./routes/movieDetailsRouter')
const schedulerDataRouter = require('./routes/schedulerDataRouter')
const activityCashbackRouter = require('./routes/getCashbackActivitiesRouter')
const walletRouter = require('./routes/walletRouter')
const transactionTableRouter = require('./routes/transactionTableRouter')
const questionTableRouter = require('./routes/getQuestionTableRouter')
const allContentDataRouter = require('./routes/getAllContentDataRouter');
const theatreDetailsRouter = require('./routes/theatreDataRouter');
const screenDetailsRouter = require('./routes/screenDataRouter');
const putLoginDataRouter = require('./routes/putLoginDataRouter');
const postActivityRouter = require('./routes/postActivityRouter');
const postOTPRouter = require('./routes/postOTPRegistrationRouter');

const userTable = require('./models/userTable');
const advertisementTable = require('./models/advertisementTable')
const clickerDeviceDetailsTable = require('./models/clickerDeviceDetailsTable');
const movieTable = require('./models/movieTable')
const schedulerTable = require('./models/schedulerTable')
const screenTable = require('./models/screenTable')
const seatManagementTable = require('./models/seatManagementTable')
const activityTable = require('./models/activityCashbackTable')
const showTable = require('./models/showTable')
const theatreTable = require('./models/theatreTable')
const ticketBookingTable = require('./models/ticketBookingTable')
const userResponseTable = require('./models/userResponseTable')
const usertable = require('./models/userTable')
const walletTable = require('./models/walletTable')
const offerTable = require('./models/offerTable')
const transactionTable = require('./models/transactionTable')
const userRoleTable = require('./models/userRoleTable')

const errorHandler = require('./middleware/errorHandlingMiddleware');

const app = express();
// Middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Custom middleware
app.use(errorHandler); // Error handling middleware
// Routes
app.use('',putLoginDataRouter);
app.use('',postLoginDataRouter);
app.use('',getUserDataRouter);
app.use('',postClickerRoute);
app.use('',postRegistrationRouter);
app.use('',postContentRouter);
app.use('',brandDetailsRouter);
app.use('',adDetailsRouter);
app.use('',movieDetailsRouter);
app.use('',schedulerDataRouter);
app.use('',activityCashbackRouter);
app.use('',walletRouter);
app.use('',transactionTableRouter);
app.use('',questionTableRouter);
app.use('',allContentDataRouter);
app.use('',theatreDetailsRouter);
app.use('',screenDetailsRouter);
app.use('',postActivityRouter);
app.use('',postOTPRouter);

const PORT = process.env.PORT || 8012;

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });

