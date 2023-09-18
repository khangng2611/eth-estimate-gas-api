const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Chain = new Schema({
  name: { type: String},
  logo: { type: String},
  evm: {type: Boolean},
  chainId: {type: String},
  symbol: { type: String},
  rpcHttp: { type: String},
  scan: { type: String},
});

module.exports = mongoose.model('Chain', Chain);