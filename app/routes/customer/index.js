let express = require('express');

// routes
let router = express.Router();
let awardRoutes = loadRoute('customer/award');

let jwtMiddleware = loadMiddleware('/jwt');
let userMiddleware = loadMiddleware('/user');

router.use('/awards', [jwtMiddleware.checkToken, userMiddleware.isActiveUser], awardRoutes);

module.exports = router;
