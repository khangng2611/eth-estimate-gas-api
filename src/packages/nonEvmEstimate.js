const Moralis = require("moralis").default;
async function APTGasPrice() {
    try {
      await Moralis.start({
        apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImJhMGQ0NTNjLWMyNDMtNGFmOC1iNzFhLWNmZTM5ZjRlZWRmOCIsIm9yZ0lkIjoiMzUzMzU2IiwidXNlcklkIjoiMzYzMTc2IiwidHlwZUlkIjoiZjdlNzZlMTItNWYyMC00YzI4LWEzZmItYWI3Njk2MjRlZmFhIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2OTIxODAxMDksImV4cCI6NDg0Nzk0MDEwOX0.zd2BlDrbU6USX-2lBZWHUnR07U634I7v2dwsiOGMSTI"
      });
    
      const response = await Moralis.AptosApi.transactions.estimateGasPrice({
        "network": "mainnet"
      });
      console.log(response);
      return response.gasEstimate;
    } catch (e) {
        console.error(e);
    }
}

module.exports = {APTGasPrice};