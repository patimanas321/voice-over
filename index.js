const express = require('express')
const app = express()
const configHelper = require('./helpers/config-helper');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const port = configHelper.getConfigValue('port');
app.listen(port, () => console.log(`Example app listening on port ${port}!`));