import {APTGasPrice, APTEstimateGas} from './aptosEstimate.js';
import { SUIGasPrice, SUIEstimateGas} from './suiEstimate.js';

async function getGasPrice(chainId) {
    try {
        switch (chainId) {
            case "2" : 
                const aptosGasPrice = await APTGasPrice();
                return aptosGasPrice.toString();
            case "100" :
                const suuiGasPrice = await SUIGasPrice();
                return suuiGasPrice.toString();
        }
    } catch (error) {
        throw error;
    }
}


async function getEstimateGas(chainId, fromAddress, toAddress, amount) {
    switch (chainId) {
        case "2" : 
            try {
                const aptosestimateGas = await APTEstimateGas(fromAddress, toAddress, amount);
                return aptosestimateGas["gasUsed"].toString();
            } catch (e) {
                throw e;
            }
        case "100" : 
            try {
                const suiEstimate = await SUIEstimateGas(fromAddress, toAddress, parseFloat(amount));
                const computationGas = parseFloat(suiEstimate[0]["computationCost"])/(parseFloat(suiEstimate[1]));
                const storageGas = parseFloat(suiEstimate[0]["storageCost"])/(parseFloat(suiEstimate[1]));
                const storageRebateGas = parseFloat(suiEstimate[0]["storageRebate"])/(parseFloat(suiEstimate[1]));
                const estimateGas = computationGas + storageGas - storageRebateGas;
                const result = [
                    {
                        "computationGas" : computationGas.toString(),
                        "storageGas" : storageGas.toString(),
                        "storageRebateGas" : storageRebateGas.toString(),
                    },
                    estimateGas.toString() 
                ]
                return result;
            } catch (e) {
                throw(e);
            }
    }
}


async function getEstimateGasFee(chainId, fromAddress, toAddress, amount) {
    try {
        switch (chainId) {
            case "2" : 
                try {
                    let aptosEstimateGasFee = await APTEstimateGas(fromAddress, toAddress, amount);
                    let lower_bound_fee = aptosEstimateGasFee["gasUsed"]*aptosEstimateGasFee["gas_unit_price"];
                    let upper_bound_fee = aptosEstimateGasFee["upper_bound_gas"]*aptosEstimateGasFee["gas_unit_price"];
                    let gas_range = {
                        "lower_bound_fee" : lower_bound_fee,
                        "upper_bound_fee" : upper_bound_fee
                    }
                    let result = {
                        "gas_fee_wei" : lower_bound_fee.toString(),
                        "gas_fee_native" : (lower_bound_fee/ Math.pow(10, 8)).toString(),
                        "gas_range" : gas_range,
                    }
                    return result;
                } catch (e) {
                    throw e;
                }
            case "100" : 
                const suiEstimate = await SUIEstimateGas(fromAddress, toAddress, amount)
                const suiGasFee = parseFloat(suiEstimate["gas_used"]["computationCost"]) + parseFloat(suiEstimate["gas_used"]["storageCost"]) - parseFloat(suiEstimate["gas_used"]["storageRebate"]);
                const result = {
                    "gas_object" : suiEstimate["gas_used"],
                    "gas_fee_wei" : suiGasFee.toString(),
                    "gas_fee_native" : (suiGasFee / Math.pow(10, 9)).toString(),
                }
                return result;
        }
    } catch (error) {
        throw error;
    }
}
// const toAddress = "0xfabb55052452dd2d4241d0bfef8c660e8b974acee76645a13fa5368a529b94e4";
// const fromAddress = "0x0ee0673378bde67bb91ce7541c6192e97498059d1cb56089d53ef67ff604413e";
// getEstimateGas("100", fromAddress, toAddress,5);

export {
    getGasPrice,
    getEstimateGas,
    getEstimateGasFee
}
