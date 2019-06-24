const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const Constants = require('./config');
const Entry = require('./entry');

const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

const router = express.Router();
Entry.useRoutes(router);
app.use('/api', router);

app.listen(Constants.API_PORT, () => console.log(`App listening on port ${Constants.API_PORT}!`));