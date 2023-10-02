import {} from 'dotenv/config'
import {getFullnodeUrl, SuiClient} from '@mysten/sui.js/client';
import {TransactionBlock} from "@mysten/sui.js/transactions";
import {encodeStr} from "@mysten/bcs";

const NETWORK = process.env.NONEVM_NETWORK;

const client = new SuiClient({url: getFullnodeUrl(NETWORK)});

async function getTxnBytesBase64(fromAddress, toAddress, amount) {
    try {
        const txb = new TransactionBlock();
        const [coin] = txb.splitCoins(txb.gas, [txb.pure(amount)]);
        txb.transferObjects([coin], txb.pure(toAddress));
        txb.setSender(fromAddress);
        const txnArray = await txb.build({client});
        return encodeStr(txnArray, 'base64');
    } catch (e) {
        throw e;
    }
}

export {
    getTxnBytesBase64
};
