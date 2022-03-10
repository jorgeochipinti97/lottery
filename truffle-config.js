//require('babel-register');
require("@babel/register");
//require('babel-polyfill');
require("@babel/polyfill");

const HDWalletProvider = require("truffle-hdwallet-provider")


module.exports = {
  networks: {


    // Rinkeby
    rinkeby: {
      provider: function () {
                                              // nodo de infura <- crear nodo en infura
        return new HDWalletProvider("", "https://rinkeby.infura.io/v3/2a960bb2952247aa90c9347cd0e43fa7")
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000
    },

    // Binance Smart Chain (BSC)
    bscTestnet: {
                                                      // dir de bsc test
      provider: () => new HDWalletProvider("", "https://data-seed-prebsc-1-s1.binance.org:8545"),
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