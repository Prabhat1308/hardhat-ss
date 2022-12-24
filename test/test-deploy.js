const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

// describe gives description of tests , can be nested
describe("SimpleStorage", function () {
  //tells what to do before each it
  let simpleStorageFactory, simpleStorage;
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });
  // in it we write our code for running tests
  it("Should start with number 0", async function () {
    const currentValue = await simpleStorage.retrieve();
    const expected = "0";
    assert.equal(currentValue.toString(), expected);
  });

  it("Should update when we call store", async function () {
    const expected = "7";
    const transactionresponse = await simpleStorage.store(expected);
    await transactionresponse.wait(1);

    const curr = await simpleStorage.retrieve();
    assert.equal(curr.toString(), expected);
  });
});
