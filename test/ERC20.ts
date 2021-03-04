/* eslint-disable func-names */
import { expect } from "chai";
import { deployments, ethers } from "hardhat";
import { BigNumber } from "@ethersproject/bignumber";
import { ERC20 } from "../typechain";
import { deploy } from "./helpers";

const setup = deployments.createFixture(async () => {
    const admin = await ethers.getNamedSigner("admin");
    const erc20 = (await deploy("ERC20", {
        args: ["Hello, world!", "USDC", BigNumber.from(6)],
        connect: admin,
    })) as ERC20;

    return {
        erc20,
    };
});

describe("Unit tests", function () {
    describe("Greeter", function () {
        let erc20: ERC20;

        beforeEach(async function () {
            const deployment = await setup();
            erc20 = deployment.erc20;
        });

        it("should have 6 decimals", async function () {
            expect((await erc20.decimals()).toString()).to.equal("6");
        });

        it("should allow anyone to mint", async function () {
            const admin = await ethers.getNamedSigner("admin");

            await erc20.mint(BigNumber.from(1000000));

            expect((await erc20.balanceOf(admin.address)).toString()).to.equal("1000000");
        });
    });
});
