import {Chain} from '../models/Chain.js';
import {EvmEstimate} from '../packages/evmEstimate.js';
import * as nonEvmEstimate from '../packages/nonEvmEstimate.js';

// gasPrice
async function gasPrice(req, res) {
    const chain = await Chain.findOne({chainId: req.query.chain_id});
    if (! chain) {
        const error = "Invalid Chain ID";
        return res.status(400).json({error});
    }
    let gasPrice = 0;
    if (! chain.evm) {
        try {
            gasPrice = await nonEvmEstimate.getGasPrice(req.query.chain_id);
        } catch (error) {
            return res.status(400).json({error});
        }
    } else {
        const estimate = new EvmEstimate(chain.rpcHttp);
        gasPrice = await estimate.getGasPrice();
    }
    // console.log(`${chain.name} - Gas Price (wei): ${gasPrice}`);
    return res.json({"gas_price_wei": BigInt(gasPrice).toString(), "chain": chain});
};

// /estimateGas
async function estimateGas(req, res) {
    const chain = await Chain.findOne({chainId: req.query.chain_id});
    if (! chain) {
        const error = "Invalid Chain ID";
        return res.status(400).json({error});
    }
    if (! chain.evm) {
        try {
            const gasObject = await nonEvmEstimate.getEstimateGas(req.query.chain_id, req.query.from_address, req.query.to_address,  req.query.amount);
            if (req.query.chain_id == "100") {
                return res.json({
                    "from_address": req.query.from_address,
                    "to_address": req.query.to_address,
                    "amount": req.query.amount,
                    "estimate_gas": gasObject[1],
                    "gas_object" : gasObject[0],
                    "chain": chain
                });
            } else if (req.query.chain_id == "2") {
                return res.json({
                    "from_address": req.query.from_address,
                    "to_address": req.query.to_address,
                    "amount": req.query.amount,
                    "estimate_gas": gasObject,
                    "chain": chain
                });
            }
        } catch (e) {
            return res.status(400).json({"error": e.toString()});
        }
    }
    const estimate = new EvmEstimate(chain.rpcHttp);
    estimate.getEstimateGas(req.query.from_address, req.query.to_address, req.query.amount)
    .then((estimateGas) => {
        return res.json({
            "from_Address": req.query.from_address,
            "to_address": req.query.to_address,
            "amount": req.query.amount,
            "estimate_gas": BigInt(estimateGas).toString(),
            "chain": chain
        });
    }).catch((error) => {
        return res.status(400).json({"error": error.toString()});
    });
}

// estimate Gas Fee
async function estimateGasFee(req, res) {
    const chain = await Chain.findOne({chainId: req.query.chain_id});
    if (! chain) {
        const error = "Invalid Chain ID";
        return res.status(400).json({error});
    }
    if (! chain.evm) {
        try {
            const gasObject = await nonEvmEstimate.getEstimateGasFee(req.query.chain_id, req.query.from_address, req.query.to_address, req.query.amount.toString());
            if (req.query.chain_id == "100") {
                return res.json({
                    "from_address": req.query.from_address,
                    "to_address": req.query.to_address,
                    "amount": req.query.amount,
                    "estimate_gas_wei": gasObject["gas_fee_wei"],
                    "estimate_gas_native" : gasObject["gas_fee_native"],
                    "gas_object" : gasObject["gas_object"],
                    "chain": chain
                });
            } else if (req.query.chain_id == "2") {
                return res.json({
                    "from_address": req.query.from_address,
                    "to_address": req.query.to_address,
                    "amount": req.query.amount,
                    "estimate_gas_wei": gasObject["gas_fee_wei"],
                    "estimate_gas_native" : gasObject["gas_fee_native"],
                    "gas_range" : gasObject["gas_range"],
                    "chain": chain
                });
            }
        } catch (e) {
            return res.status(400).json({"error": e.toString()});
        }
    }
    try {
        const estimate = new EvmEstimate(chain.rpcHttp);
        const gasFee = await estimate.getEstimateGasFee(req.query.from_address, req.query.to_address, req.query.amount);
        return res.json({
            "from_address": req.query.from_address,
            "to_address": req.query.to_address,
            "amount": req.query.amount,
            "estimate_gas_wei": BigInt(gasFee).toString(),
            "estimate_gas_native": estimate.weiToEth(gasFee.toString()),
            "chain": chain
        });
    } catch(error) {
        return res.status(400).json({"error": error.toString()});
    }
}

export {
    gasPrice,
    estimateGas,
    estimateGasFee
}
