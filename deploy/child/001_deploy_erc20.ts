import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { BigNumber } from "@ethersproject/bignumber";

const CHILD_CHAIN_MANAGER_PROXY = "0xb5505a6d998549090530911180f38aC5130101c6";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts } = hre;

    const { deployer } = await getNamedAccounts();

    await deployments.deploy("ChildERC20", {
        from: deployer,
        args: ["USDC", "USDC", BigNumber.from(6), CHILD_CHAIN_MANAGER_PROXY],
        log: true,
    });
};

export default func;
