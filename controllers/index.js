const router = require('express').Router();

const apiRoutes = require('./api');
const blogController = require('./blogController');

router.use('/', blogController);
router.use('/api', apiRoutes);

module.exports = router;