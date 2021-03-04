import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { BigNumber } from "@ethersproject/bignumber";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts } = hre;

    const { deployer } = await getNamedAccounts();

    await deployments.deploy("ERC20", {
        from: deployer,
        args: ["USDC", "USDC", BigNumber.from(6)],
        log: true,
    });
};

export default func;
