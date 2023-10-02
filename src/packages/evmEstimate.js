import {Web3} from 'web3';


class EvmEstimate {
    constructor(HttpProvider) {
        this.provider = new Web3.providers.HttpProvider(HttpProvider);
        this.web3 = new Web3(this.provider);
    }
    async getGasPrice() {
        const gasPrice = await this.web3.eth.getGasPrice().catch((error) => {
            // console.error('Error get gas price: ', error);
            throw error;
        });
        return gasPrice;
    }
    
    async getEstimateGas(fromAddress, toAddress, amount) {
        const transactionParams = {
            from: fromAddress,
            to: toAddress,
            value: this.web3.utils.toWei(amount, 'ether'),
            // value: this.web3.utils.toWei(amount.toString(), 'ether'), // Amount of ETH in wei
            // gas: 20000, // You can adjust this value based on the complexity of the transaction
        };
    
        // Estimate gas for the transaction
        const estimateGas = await this.web3.eth.estimateGas(transactionParams).catch((error) => {
            // console.error('Error estimating gas: ', error);
            throw error;
        });
        return estimateGas;
    }
    
    async getEstimateGasFee(fromAddress, toAddress, amount) {
        let gasPrice = await this.getGasPrice();
        let estimateGas = await this.getEstimateGas(fromAddress, toAddress, amount);
        return gasPrice * estimateGas;
    }
    
    weiToEth(weiVaue) {
        return this.web3.utils.fromWei(weiVaue, 'ether');
    }    
}

// function setProvider(HttpProvider) {
//     const provider = new Web3.providers.HttpProvider(HttpProvider);
//     web3 = new Web3(provider);
// }

export {EvmEstimate}
