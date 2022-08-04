let express = require('express');
let { apiVersion } = require('../config/config');
let path = require("path");

// routes
let customerRoutes = loadRoute('customer/index');

let router = express.Router();

router.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
});

router.use('/customer', customerRoutes);

router.get('/assets/:type/:folder/:filename', (req, res) => {
    res.sendFile(path.join(__dirname, "../../assets/" + req.params.type + '/' + req.params.folder + '/' + req.params.filename));
});

module.exports = router;
