import { Router } from 'express';
import bodyParser from 'body-parser';
import * as gasController from '../controller/gasControlller.js';

const router = Router();

router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json() );

router.get('/gas-price', gasController.gasPrice);
router.get('/estimate-gas', gasController.estimateGas);
router.get('/estimate-gas-fee', gasController.estimateGasFee);

export {router};
