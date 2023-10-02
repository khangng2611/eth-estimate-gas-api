import {} from 'dotenv/config'
import { HexString , AptosClient, AptosAccount, TxnBuilderTypes} from "aptos";

const NETWORK = process.env.NONEVM_NETWORK;
const NODE_URL = `https://fullnode.${NETWORK}.aptoslabs.com`;
const client = new AptosClient(NODE_URL);

const TXN_QUERY = {
    start : 0,
    limit: 1
}
const SIMULATE_QUERY = {
    estimateGasUnitPrice: true,
    estimateMaxGasAmount: true,
    estimatePrioritizedGasUnitPrice: false
}

async function simulateTransaction (fromAddress, toAddress, amount) {
    try {
        let senderAccountTxn = await client.getAccountTransactions(fromAddress, TXN_QUERY);
        let senderPublicKey = senderAccountTxn[0]["signature"]["public_key"];
        let senderPublicKeyBytes = new TxnBuilderTypes.Ed25519PublicKey(new HexString(senderPublicKey).toUint8Array());
        let senderAccount = new AptosAccount(undefined, fromAddress);
    
        let payload = {
            type: "entry_function_payload",
            function: "0x1::aptos_account::transfer_coins",
            type_arguments: [
                "0x1::aptos_coin::AptosCoin"
            ],
            arguments: [
                toAddress,
                amount*Math.pow(10, 8)
            ],
        };
        let rawTxn = await client.generateTransaction(senderAccount.address(), payload);    
        let simulation = await client.simulateTransaction(senderPublicKeyBytes, rawTxn, SIMULATE_QUERY);
        // console.log(simulation);
        return simulation;
    } catch (e) {
        throw e;
    }
}

export {simulateTransaction};

// simulateTransaction("0x7b16562182ddcbe1f3196a0f7481b14865ab18bc687f8df45f1ffa845d0073d6","0x92b2dccea648a4ce7873390327d36c2177eabae2c3280761bfd9e2dccf154607",3000);
// const SENDER_ADDRESS = "0x7b16562182ddcbe1f3196a0f7481b14865ab18bc687f8df45f1ffa845d0073d6";
// const RERCEIVER_ADDRESS = "0x92b2dccea648a4ce7873390327d36c2177eabae2c3280761bfd9e2dccf154607";
// const payload2 = {
//     type: "entry_function_payload",
//     function: "0x1::coin::transfer",
//     type_arguments: [
//         "0x1::aptos_coin::AptosCoin"
//     ],
//     arguments: [
//         RERCEIVER_ADDRESS, 
//         10000
//     ],
// };