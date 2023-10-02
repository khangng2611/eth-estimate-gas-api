import {} from 'node-fetch';
import {} from 'dotenv/config';
import {simulateTransaction} from './sdk/aptosSdk.js';
const NETWORK = process.env.NONEVM_NETWORK;

const URL = `https://fullnode.${NETWORK}.aptoslabs.com/v1/estimate_gas_price`;

async function APTGasPrice() {
    try {
        const options = {method: 'GET'};
        const response = await fetch(URL, options);
        const data = await response.text();
        const gasPrice = JSON.parse(data);
        // deprioritized_gas_estimate, gas_estimate, prioritized_gas_estimate
        return gasPrice["gas_estimate"];
    } catch (e) {
        throw e;
    }
}

async function APTEstimateGas(fromAddress, toAddress, amount) {
    try {
        let simulation = await simulateTransaction(fromAddress, toAddress, amount);
        if (simulation[0]["success"] == false) {
            throw simulation[0]["vm_status"];
        }
        // console.log(simulation);
        let gasUsed = parseFloat(simulation[0]["gas_used"]);
        let max_gas_amount = parseFloat(simulation[0]["max_gas_amount"]);
        let upper_bound_gas = (gasUsed*1.5 < max_gas_amount)? gasUsed*1.5 : max_gas_amount;
        let gas_unit_price = parseFloat(simulation[0]["gas_unit_price"]);
        return {"gasUsed":gasUsed, "upper_bound_gas":upper_bound_gas, "gas_unit_price":gas_unit_price};
    } catch (e) {
        throw e;
    }
}

// APTEstimateGas("0x7b16562182ddcbe1f3196a0f7481b14865ab18bc687f8df45f1ffa845d0073d6","0x92b2dccea648a4ce7873390327d36c2177eabae2c3280761bfd9e2dccf154607","3");


export {
    APTGasPrice,
    APTEstimateGas
}
