var express = require('express');
var router = express.Router();

router.use('/api/locations', require('./chargeData'));

module.exports = router;