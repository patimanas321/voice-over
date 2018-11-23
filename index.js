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

// TESTING - TO BE REMOVED
app.get('/', (req, res) => {
    res.send('working!!');
});

const port = configHelper.getConfigValue('port');
app.listen(port, () => console.log(`App listening on port ${port}!`));