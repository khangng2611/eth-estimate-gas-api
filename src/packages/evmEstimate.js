const {Web3} = require('web3');

// let provider = new Web3.providers();
// // let provider = new Web3.providers.HttpProvider('https://sepolia.infura.io/v3/49d40174ef234862b6b0be69b07cf4f9');
// let web3 = new Web3();

function setProvider (HttpProvider) {
  provider = new Web3.providers.HttpProvider(HttpProvider);
  web3 = new Web3(provider);
}

async function getGasPrice() {
  const gasPrice = await web3.eth.getGasPrice()
    .catch((error) => {
      console.error('Error get gas price: ', error);
      throw error;
    });
  return gasPrice;
}

async function getEstimateGas(fromAddress, toAddress, amount) {
  const transactionParams = {
    from: fromAddress,
    to: toAddress,
    value: web3.utils.toWei(amount, 'ether'),
    // value: web3.utils.toWei(amount.toString(), 'ether'), // Amount of ETH in wei
    // gas: 20000, // You can adjust this value based on the complexity of the transaction
  };

  // Estimate gas for the transaction
  const estimateGas = await web3.eth.estimateGas(transactionParams)
    .catch((error) => {
      console.error('Error estimating gas: ', error);
      throw error;
    });
  return estimateGas;
}

async function getEstimateGasFee(fromAddress, toAddress, amount) {
  let gasPrice = await getGasPrice();
  let estimateGas = await getEstimateGas(fromAddress, toAddress, amount);
  return gasPrice*estimateGas;
}

function weiToEth (weiVaue) {
  return web3.utils.fromWei(weiVaue, 'ether');
}


// const fromAddress = '0xcb0574B4a0A0fD2004e391C0A3C43d7106Ba36eD';
// const toAddress = '0x0d0e75A8Bfc833E400779af361281bd174891032';
// const amount = 0.4;

// const estimateGasFee = getEstimateGasFee(fromAddress, toAddress, amount)
//   .then((estimateGasFee) => {
//       console.log(`Estimate Gas Fee (wei): ${estimateGasFee.toString()}`);
//       console.log(`Estimate Gas Fee (ETH): ${web3.utils.fromWei(estimateGasFee.toString(), 'ether')}`);
//   }); 

// const gasPrice = getGasPrice()
//   .then((gasPrice) => {
//       console.log(`Gas Price (wei): ${gasPrice}`);
//   }); 

// const estimateGas = getEstimateGas(fromAddress, toAddress, amount)
//   .then((estimateGas) => {
//     console.log(`Estimated Gas: ${estimateGas}`);
//   })

module.exports = {setProvider, getGasPrice, getEstimateGas, getEstimateGasFee, weiToEth}

// INTERNAL TXN
// const contractAddress = '0x1234567890123456789012345678901234567890';
// const contractABI = [
//   // ...
// ];
// const contract = new web3.eth.Contract(contractABI, contractAddress);
// const recipientAddress = '0x1234567890123456789012345678901234567890';
// const amountToSend = web3.utils.toWei('1', 'ether');
// const gasEstimate = await contract.methods.transfer(recipientAddress, amountToSend).estimateGas();

