// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERROR} from "contracts/types/Error.sol";

library Data {
    bytes32 constant key = keccak256("market.storage");

    struct Storage {
        mapping(address => bool) permission;
        mapping(address => mapping(address => address)) market;
        mapping(address => address[]) markets;
        address[] all_markets;
    }

    function load() internal pure returns (Storage storage $) {
        bytes32 __ = key;
        assembly {
            $.slot := __
        }
    }

    // functions for market diamond contract only
    function market(
        Storage storage $,
        address _addr,
        address _base,
        address _quote
    ) internal returns (address) {
        return $.market[_base][_quote] = _addr;
    }

    function push(
        Storage storage $,
        address _addr,
        address _base,
        address _quote
    ) internal {
        if ($.market[_base][_quote] != address(0))
            revert ERROR.CODE(ERROR.TYPE.EXIST_MARKET);
        if ($.market[_quote][_base] != address(0))
            revert ERROR.CODE(ERROR.TYPE.EXIST_MARKET);

        $.market[_base][_quote] = _addr;
        $.market[_quote][_base] = _addr;

        $.markets[_base].push(_addr);
        $.markets[_quote].push(_addr);
        $.all_markets.push(_addr);
    }
}
