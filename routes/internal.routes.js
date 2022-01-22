const express = require('express');
const router = express.Router();
const recordsController = require('./../controllers/records.controller.js');
router.post('/records', recordsController.getRecords);

module.exports = router;