const { ethers } = require("ethers");
require("dotenv").config();

async function main() {
  const network = process.env.SEPOLIA_RPC_URL;
  const provider = new ethers.providers.JsonRpcProvider(network);

  const tokenAddress = "0x6d3e6C4FFb1D07D686feE6fbA9A44F78c88D86e3";
  const privateKey = process.env.PRIVATE_KEY;
  const airdropAmount = ethers.utils.parseEther("33"); // Replace with the amount of tokens to be airdropped

  const wallet = new ethers.Wallet(privateKey, provider);
  const token = new ethers.Contract(
    tokenAddress,
    ["function transfer(address, uint256)"],
    wallet
  );

  const recipientAddresses = [
    "0xaE5BCF116832f0F4cE2866dF8A5db5f75870b91B",
    "0x3Ce7AE47a48d5591266928914feb11e3DF4c7F8e",

    // Add more recipient addresses as needed
  ];

  for (const address of recipientAddresses) {
    const tx = await token.transfer(address, airdropAmount);
    await tx.wait();
    console.log(
      `Airdropped ${ethers.utils.formatEther(
        airdropAmount
      )} tokens to address: ${address}`
    );
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
