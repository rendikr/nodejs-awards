let express = require('express');

// middlewares
let apiNotFound = loadMiddleware('/api-not-found');
let router = express.Router();

//controllers
let controller = loadController('customer/award');

router.get('', controller.all);

router.use( apiNotFound );

module.exports = router;
