import {} from 'node-fetch';
import {} from 'dotenv/config'
import {getTxnBytesBase64} from './sdk/suiSdk.js';

const NETWORK = process.env.NONEVM_NETWORK;

const URL = `https://fullnode.${NETWORK}.sui.io:443`;

async function SUIGasPrice() {
    const body = {
        jsonrpc: "2.0",
        id: 1,
        method: "suix_getReferenceGasPrice",
        params: []
    }
    const options = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch(URL, options);
        const data = await response.json();
        return data['result'];
    } catch (error) {
        throw error;
    }
}

async function SUIEstimateGas(fromAddress, toAddress, amount) {
    try {
        const txnBytes = await getTxnBytesBase64(fromAddress, toAddress, amount);
        const body = {
            jsonrpc: "2.0",
            id: 1,
            method: "sui_dryRunTransactionBlock",
            params: [txnBytes]
        }
        const options = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const response = await fetch(URL, options);
        const data = await response.json();
        return {
            "gas_used" : data["result"]["effects"]["gasUsed"],
            "gas_price" : data["result"]["input"]["gasData"]["price"],
        };
    } catch (error) {
        throw error;
    }
}
// const toAddress = "0xfabb55052452dd2d4241d0bfef8c660e8b974acee76645a13fa5368a529b94e4";
// const fromAddress = "0x0ee0673378bde67bb91ce7541c6192e97498059d1cb56089d53ef67ff604413e";
// SUIEstimateGas(fromAddress, toAddress,5)
// .then((r) => {
//     console.log("OK");
// })
// .catch ((e) => {
//     console.log("CATCH!1");
// });


export { SUIGasPrice, SUIEstimateGas };
