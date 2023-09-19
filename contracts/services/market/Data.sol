// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.19;

import {IDiamond} from '../../../modules/diamond/interfaces/IDiamond.sol';
import {IDiamondCut} from '../../../modules/diamond/interfaces/IDiamondCut.sol';
import {ERROR} from 'contracts/types/Error.sol';

library Data {
    bytes32 constant key = keccak256('market.storage');

    struct Storage {
        mapping(address => bool) permission;
        mapping(address => mapping(address => address)) market;
        mapping(address => address[]) markets;
        address[] all_markets;
    }

    function load() internal pure returns (Storage storage s) {
        bytes32 __ = key;
        assembly {
            s.slot := __
        }
    }

    // functions for market diamond contract only
    function market(Storage storage s, address _addr, address _base, address _quote) internal returns (address) {
        return s.market[_base][_quote] = _addr;
    }

    function push(Storage storage s, address _addr, address _base, address _quote) internal {
        if (s.market[_base][_quote] != address(0)) revert ERROR.CODE(ERROR.TYPE.EXIST_MARKET);
        if (s.market[_quote][_base] != address(0)) revert ERROR.CODE(ERROR.TYPE.EXIST_MARKET);

        s.market[_base][_quote] = _addr;
        s.market[_quote][_base] = _addr;

        s.markets[_base].push(_addr);
        s.markets[_quote].push(_addr);
        s.all_markets.push(_addr);
    }
}
