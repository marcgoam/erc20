require("dotenv").config();

const ethers = require("ethers");

async function main() {
  const network = process.env.SEPOLIA_RPC_URL;
  const provider = new ethers.providers.JsonRpcProvider(network);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  let artifacts = await hre.artifacts.readArtifact("GuardianToken");

  const deployerAddress = await wallet.getAddress();
  console.log("Deploying ERC-20 contract with address:", deployerAddress);

  const weiAmount = await provider.getBalance(deployerAddress);
  console.log("Account balance:", await ethers.utils.formatEther(weiAmount));

  const ERC20Contract = new ethers.ContractFactory(
    artifacts.abi,
    artifacts.bytecode,
    wallet
  );
  const token = await ERC20Contract.deploy();

  await token.deployed();
  console.log("ERC-20 contract deployed at address:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
