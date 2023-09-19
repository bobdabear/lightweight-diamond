// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {DiamondContract} from "modules/diamond/DiamondContract.sol";
import {DiamondContractManager} from "modules/diamond/DiamondContractManager.sol";

import {Orderbook} from "contracts/services/orderbook/Orderbook.sol";
import {Events} from "../shared/Events.sol";
import {Modifiers} from "../shared/Modifiers.sol";
import {Data} from "../Data.sol";

contract Create is Modifiers {
    using Data for Data.Storage;

    function create(
        address _base,
        address _quote,
        uint _initialPrice
    ) public auth returns (address) {
        address newMarket = address(
            new Orderbook(_base, _quote, _initialPrice, address(this))
        );
        s.push(newMarket, _base, _quote);
        emit Events.MarketOpen(newMarket, _base, _quote);
        return newMarket;
    }
}
