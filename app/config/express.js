let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let helmet = require('helmet');
let path = require('path');
let bearerToken = require('express-bearer-token');
const db = require('../models');
const hbs = require('hbs')

// Define paths for Express config
const assetsPath = path.join(__dirname, '../templates/assets')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// let routes = loadRoute('/routes');

/**
 * Express instance
 * @public
 */
let app = express();

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(assetsPath))

app.use(
    express.json({
        inflate: true,
        limit: '100mb',
        reviver: null,
        strict: false,
        type: 'application/form-data',
        verify: undefined,
    })
);

app.use(bearerToken());

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());
app.options('*', cors());

db.sequelize.sync();

// app.use(routes);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Awards',
        author: 'Rendi K.'
    })
})

module.exports = app;
