const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json() );

const gasController = require('../controller/gasControlller.js');

router.get('/gasPrice', gasController.gasPrice);
router.get('/estimateGas', gasController.estimateGas);
router.get('/estimateGasFee', gasController.estimateGasFee);

module.exports = router;
