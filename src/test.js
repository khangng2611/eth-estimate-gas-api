const {Web3} = require('web3');

const provider = new Web3.providers.HttpProvider('https://polygon-mainnet.infura.io/v3/49d40174ef234862b6b0be69b07cf4f9');
const web3 = new Web3(provider);

web3.eth.getGasPrice()
.then((price)=>{
    console.log(price);
})

