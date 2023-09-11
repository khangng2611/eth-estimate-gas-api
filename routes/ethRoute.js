const express = require('express');
const ethRouter = express.Router();
const bodyParser = require('body-parser');
const estimate = require('../packages/ethEstimate');

ethRouter.use(bodyParser.urlencoded({extended : true}));
ethRouter.use(bodyParser.json() );

ethRouter.get('/gasPrice', (req, res) => {
    const gasPrice = estimate.getGasPrice()
        .then((gasPrice) => {
            console.log(`Gas Price (wei): ${gasPrice}`);
            res.json({"gasPrice" : BigInt(gasPrice).toString()});
        })
        .catch((error) => {
            res.status(400).send(error);
        });
    
});

ethRouter.get('/estimateGas', (req, res) => {
    const estimateGas = estimate.getEstimateGas(req.query.fromAddress, req.query.toAddress, req.query.amount)
        .then((estimateGas) => {
            console.log(`Estimated Gas: ${estimateGas}`);
            res.json({"estimateGas" : BigInt(estimateGas).toString()});
        })
        .catch((error) => {
            res.status(400).send(error);
        });
});

ethRouter.get('/estimateGasFee', (req, res) => {
    const estimateGasFee = estimate.getEstimateGasFee(req.query.fromAddress, req.query.toAddress, req.query.amount)
    .then((estimateGasFee) => {
        console.log(`Estimate Gas Fee (wei): ${estimateGasFee.toString()}`);
        console.log(`Estimate Gas Fee (ETH): ${estimate.weiToEth(estimateGasFee.toString())}`);
        res.json({"estimateGas_wei" : BigInt(estimateGasFee).toString(), "estimateGas_eth" : estimate.weiToEth(estimateGasFee.toString())});
    })
    .catch((error) => {
        res.status(400).send(error);
    });
    
});

module.exports = ethRouter;