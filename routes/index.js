const express = require('express');
const router = express.Router();

router.use('/', require('./internal.routes'));
module.exports = router;