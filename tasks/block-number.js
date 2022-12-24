const { task } = require("hardhat/config");

task("block-number", "Print the current block number").setAction(
  async (taskArgs, hre) => {
    const blocknum = await hre.ethers.provider.getBlockNumber();
    console.log("current block num  :" + blocknum);
  }
);

//
module.exports = {};
