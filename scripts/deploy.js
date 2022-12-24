const { ethers, run, network } = require("hardhat");
require("dotenv").config();

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying");
  const SimpleStorage = await SimpleStorageFactory.deploy();
  await SimpleStorage.deployed();
  console.log("Deployed at :" + SimpleStorage.address);
  if (network.config.chainID === 5 && process.env.ETHERSCAN_API) {
    await SimpleStorage.deployTransaction.wait(6); // number is number of blocks to be waited
    await verify(SimpleStorage.address, []);
  }
}

async function verify(contractAddress, args) {
  console.log("Verifying contract");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("already verified");
    } else {
      console.log(e);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
