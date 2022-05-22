//require('babel-register');
require("@babel/register");
//require('babel-polyfill');
require("@babel/polyfill");

var HDWalletProvider = require("truffle-hdwallet-provider")
var mnemonic = 

module.exports = {
  networks: {

    // Ganache 
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
    },

    // Rinkeby
    rinkeby: {
      provider: function () {
                                              // nodo de infura <- crear nodo en infura
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/5e256cb969184ddab77a3a7c49084f7c")
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000
    },

    // Binance Smart Chain (BSC)
    bscTestnet: {
                                                      // dir de bsc test
      provider: () => new HDWalletProvider("crumble shaft fish start sugar cart rain demand soda ginger must venue", "https://data-seed-prebsc-1-s1.binance.org:8545"),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },

  },
  contracts_directory: './contracts',
  contracts_build_directory: './abis/',
  compilers: {
    solc: {
      version: "0.8.9",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}