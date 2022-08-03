let express = require('express');

// middlewares
let apiNotFound = loadMiddleware('/api-not-found');
let router = express.Router();

//controllers
let controller = loadController('customer/award');

router.get('', controller.all);
router.get('/detail/:id', controller.single);

router.use( apiNotFound );

module.exports = router;
