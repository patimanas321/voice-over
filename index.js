const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const configHelper = require('./helpers/config-helper');
const userRoute = require('./routers/user');

app.use(bodyParser.json());
app.use(cors({
    origin: configHelper.getConfigValue('allowedOrigins')
}));

app.use('/user', userRoute);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 443);

//Development
//app.listen(3000, () => {console.log('Listening at Port:3000')});