import { ethers } from "hardhat";
import { getContractFactory } from "hardhat/types";
import { FacetCutAction, getSelectors } from "./utils";
import { ContractFactory } from "ethers";

describe("Diamond Test", function () {

  const FacetNames = [
    // Market facets
    'contracts/services/market/facets/Create.sol:Create',
    'contracts/services/market/facets/Get.sol:Get',
    // Orderbook facets will be storage in the Market for factory later.
    'contracts/services/orderbook/facets/Order.sol:Order',
    'contracts/services/orderbook/facets/Cancel.sol:Cancel',
    'contracts/services/orderbook/facets/Get.sol:Get',
  ];

  const facetCuts: any[] = [];
  let diamondArgs: any = {};

  beforeEach(async function () {
    const accounts = await ethers.getSigners();

    diamondArgs = {
      owner: accounts[0].address,
      init: ethers.ZeroAddress,
      initCalldata: ethers.ZeroAddress
    }

    console.log("Deployer:", diamondArgs.owner, "(owner)");

    for (const FacetName of FacetNames) {
      const Facet: ContractFactory = await ethers.getContractFactory(FacetName);
      const facet = await Facet.deploy();

      console.log(`---------------------------------------------------------------`);
      console.log(`Facet Name: ${FacetName}`);
      console.log(`Deployed Address: ${await facet.getAddress()}`);
      console.log(`Functions: ${await getSelectors(facet)}`);
      console.log(`---------------------------------------------------------------`);

      facetCuts.push({ // FaceCut 구조체 형채로 넣음
        facetAddress: await facet.getAddress(),
        action: FacetCutAction.Add,
        functionSelectors: await getSelectors(facet)
      })
    }
  })


  it("", async function () {
    const tokens = await ethers.getSigners();

    console.log(':: Market Diamond Deploy ::');
    const market: ContractFactory = await ethers.getContractFactory("Market");
    const marketDiamond: any = await market.deploy(facetCuts, diamondArgs);
    console.log('Market: ', await marketDiamond.getAddress());

    describe('', () => {
      // factory orderbook1 diamond from market diamond
      it("New Orderbook 1 Diamond Create", async function () {
        console.log(':: New Orderbook 1 Diamond Create ::');
        await (await ethers.getContractAt(
          "contracts/services/market/facets/Create.sol:Create",
          await marketDiamond.getAddress())
        ).create(
          await tokens[1].getAddress(),
          await tokens[2].getAddress(),
          1000
        );

        const orderbookDiamondFacade1 = await ethers.getContractAt(
          "contracts/services/orderbook/facets/Get.sol:Get",
          (await (await ethers.getContractAt(
            'contracts/services/market/facets/Get.sol:Get',
            await marketDiamond.getAddress())
          ).getAllMarkets())[0]);

        console.log('Orderbook 1 Price: ', await orderbookDiamondFacade1.getPrice());

        // factory orderbook2 diamond from market diamond
        console.log(':: New Orderbook 2 Diamond Create ::');
        await (await ethers.getContractAt(
          "contracts/services/market/facets/Create.sol:Create",
          await marketDiamond.getAddress())
        ).create(
          await tokens[3].getAddress(),
          await tokens[4].getAddress(),
          2000
        );

        const orderbookDiamondFacade2 = await ethers.getContractAt(
          "contracts/services/orderbook/facets/Get.sol:Get",
          (await (await ethers.getContractAt(
            'contracts/services/market/facets/Get.sol:Get',
            await marketDiamond.getAddress())
          ).getAllMarkets())[1]);

        console.log('Orderbook 2 Price: ', await orderbookDiamondFacade2.getPrice());
      });

      it("", async function () {
        const orderbook1OrderFacet = await ethers.getContractAt(
          "contracts/services/orderbook/facets/Order.sol:Order",
          (await (await ethers.getContractAt(
            'contracts/services/market/facets/Get.sol:Get',
            await marketDiamond.getAddress())
          ).getAllMarkets())[0]);

        const orderbook1CancelFacet = await ethers.getContractAt(
          "contracts/services/orderbook/facets/Cancel.sol:Cancel",
          (await (await ethers.getContractAt(
            'contracts/services/market/facets/Get.sol:Get',
            await marketDiamond.getAddress())
          ).getAllMarkets())[0]);

        const orderbook1GetFacet = await ethers.getContractAt(
          "contracts/services/orderbook/facets/Get.sol:Get",
          (await (await ethers.getContractAt(
            'contracts/services/market/facets/Get.sol:Get',
            await marketDiamond.getAddress())
          ).getAllMarkets())[0]);

        console.log(':: Orderbook 1 Shared Internal Function Test ::');

        await orderbook1OrderFacet.order(0, 250)
        console.log(`---------------------------------------------------------------`);
        console.log('Orderbook 1 Price: ', await orderbook1GetFacet.getPrice());
        console.log('Orderbook 1 Tick: ', await orderbook1GetFacet.getTick());
        console.log(`---------------------------------------------------------------`);

        await orderbook1OrderFacet.order(1, 750)
        console.log(`---------------------------------------------------------------`);
        console.log('Orderbook 1 Price: ', await orderbook1GetFacet.getPrice());
        console.log('Orderbook 1 Tick: ', await orderbook1GetFacet.getTick());
        console.log(`---------------------------------------------------------------`);

        await orderbook1CancelFacet.liquidation(10)
        console.log(`---------------------------------------------------------------`);
        console.log('Orderbook 1 Price: ', await orderbook1GetFacet.getPrice());
        console.log('Orderbook 1 Tick: ', await orderbook1GetFacet.getTick());
        console.log(`---------------------------------------------------------------`);

        const orderbook2OrderFacet = await ethers.getContractAt(
          "contracts/services/orderbook/facets/Order.sol:Order",
          (await (await ethers.getContractAt(
            'contracts/services/market/facets/Get.sol:Get',
            await marketDiamond.getAddress())
          ).getAllMarkets())[1]);

        const orderbook2CancelFacet = await ethers.getContractAt(
          "contracts/services/orderbook/facets/Cancel.sol:Cancel",
          (await (await ethers.getContractAt(
            'contracts/services/market/facets/Get.sol:Get',
            await marketDiamond.getAddress())
          ).getAllMarkets())[1]);

        const orderbook2GetFacet = await ethers.getContractAt(
          "contracts/services/orderbook/facets/Get.sol:Get",
          (await (await ethers.getContractAt(
            'contracts/services/market/facets/Get.sol:Get',
            await marketDiamond.getAddress())
          ).getAllMarkets())[1]);

        console.log(':: Orderbook 2 Shared Internal Function Test ::');

        await orderbook2OrderFacet.order(0, 1250)
        console.log(`---------------------------------------------------------------`);
        console.log('Orderbook 2 Price: ', await orderbook2GetFacet.getPrice());
        console.log('Orderbook 2 Tick: ', await orderbook2GetFacet.getTick());
        console.log(`---------------------------------------------------------------`);

        await orderbook2OrderFacet.order(1, 1750)
        console.log(`---------------------------------------------------------------`);
        console.log('Orderbook 2 Price: ', await orderbook2GetFacet.getPrice());
        console.log('Orderbook 2 Tick: ', await orderbook2GetFacet.getTick());
        console.log(`---------------------------------------------------------------`);

        await orderbook2CancelFacet.liquidation(30)
        console.log(`---------------------------------------------------------------`);
        console.log('Orderbook 2 Price: ', await orderbook2GetFacet.getPrice());
        console.log('Orderbook 2 Tick: ', await orderbook2GetFacet.getTick());
        console.log(`---------------------------------------------------------------`);
      });

    })
  });
});
