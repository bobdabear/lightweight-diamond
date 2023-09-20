// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IDiamondCut} from "modules/diamond/interfaces/IDiamondCut.sol";
import {DiamondContract} from "modules/diamond/DiamondContract.sol";

import {Data} from "./Data.sol";

import "hardhat/console.sol";

contract Market is DiamondContract {
    using Data for Data.Storage;

    Data.Storage internal $;

    /*
     * At the time of creation, the parent diamond must also receive the facets of the child (facade) through 'diamondCut' here.
     */

    constructor(
        IDiamondCut.FacetCut[] memory _diamondCut,
        IDiamondCut.DiamondArgs memory _args
    ) DiamondContract(keccak256("market.storage"), _diamondCut, _args) {
        $.permission[msg.sender] = true;
        console.log($.permission[msg.sender]);
    }
}
