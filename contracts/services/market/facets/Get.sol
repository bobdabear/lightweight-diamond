// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {DiamondContract} from "modules/diamond/DiamondContract.sol";
import {DiamondContractManager} from "modules/diamond/DiamondContractManager.sol";

import {Modifiers} from "../shared/Modifiers.sol";

contract Get is Modifiers {
    function getAllMarkets() public view returns (address[] memory) {
        return s.all_markets;
    }

    function getMarketsFor(
        address _token
    ) public view returns (address[] memory) {
        return s.markets[_token];
    }

    function getOrderbook(
        address _base,
        address _quote
    ) public view returns (address) {
        return s.market[_base][_quote];
    }
}
