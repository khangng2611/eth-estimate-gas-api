const Chain = require('../models/Chain')
const estimate = require('../packages/evmEstimate');
const nonEvmEstimate = require('../packages/nonEvmEstimate');

class gasController {
    async gasPrice (req, res) {
        const chain = await Chain.findOne({chainId : req.query.chainId});
        if (!chain.evm) {
            const gasPrice = await nonEvmEstimate.APTGasPrice();
            console.log(`Gas Price: ${gasPrice}`);
            res.json({"gasPrice_wei": gasPrice.toString(), "chain": chain});
            return;
        }
        estimate.setProvider(chain.rpcHttp);
        estimate.getGasPrice()
            .then((gasPrice) => {
                console.log(`Gas Price (wei): ${gasPrice}`);
                res.json({"gasPrice_wei" : BigInt(gasPrice).toString(), "chain": chain});
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    };
    async estimateGas (req, res) {
        const chain = await Chain.findOne({chainId : req.query.chainId});
        if (!chain.evm) {
            const gasPrice = await nonEvmEstimate.APTGasPrice();
            console.log(`estimateGas: ${gasPrice}`);
            res.json({
                "fromAddress" : req.query.fromAddress,
                "toAddress" : req.query.toAddress,
                "amount" : req.query.amount,
                "estimateGas" : gasPrice.toString(), 
                "chain": chain
            });
            return;
        }
        estimate.setProvider(chain.rpcHttp);
        estimate.getEstimateGas(req.query.fromAddress, req.query.toAddress, req.query.amount)
            .then((estimateGas) => {
                console.log(`Estimated Gas: ${estimateGas}`);
                res.json({
                    "fromAddress" : req.query.fromAddress,
                    "toAddress" : req.query.toAddress,
                    "amount" : req.query.amount,
                    "estimateGas" : BigInt(estimateGas).toString(), 
                    "chain": chain
                });
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    }
    async estimateGasFee (req, res) {
        const chain = await Chain.findOne({chainId : req.query.chainId});
        if (!chain.evm) {
            const gasPrice = await nonEvmEstimate.APTGasPrice();
            console.log(`estimateGas: ${gasPrice}`);
            res.json({
                "fromAddress" : req.query.fromAddress,
                "toAddress" : req.query.toAddress,
                "amount" : req.query.amount,
                "estimateGas_wei" : gasPrice.toString(), 
                "chain": chain
            });
            return;
        }
        estimate.setProvider(chain.rpcHttp);
        const estimateGasFee = estimate.getEstimateGasFee(req.query.fromAddress, req.query.toAddress, req.query.amount)
        .then((estimateGasFee) => {
            console.log(`Estimate Gas Fee (wei): ${estimateGasFee.toString()}`);
            // console.log(`Estimate Gas Fee (ETH): ${estimate.weiToEth(estimateGasFee.toString())}`);
            // res.json({"estimateGas_wei" : BigInt(estimateGasFee).toString(), "estimateGas_eth" : estimate.weiToEth(estimateGasFee.toString())});
            res.json({
                "fromAddress" : req.query.fromAddress,
                "toAddress" : req.query.toAddress,
                "amount" : req.query.amount,
                "estimateGas_wei" : BigInt(estimateGasFee).toString(), 
                "chain": chain
            });
        })
        .catch((error) => {
            res.status(400).send(error);
        });
    }
}
module.exports = new gasController();
