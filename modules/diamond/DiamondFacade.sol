// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.19;

/******************************************************************************\
* Author: Nick Mudge <nick@perfectabstractions.com>, Twitter/Github: @mudgen
* Modifier : Coinmeca Team <contact@coinmeca.net>
* Lightweight version of EIP-2535 Diamonds 
/******************************************************************************/

import {IDiamond} from "./interfaces/IDiamond.sol";
import {IDiamondCut} from "./interfaces/IDiamondCut.sol";

import {DiamondFacadeAuth} from "./utils/facade/DiamondFacadeAuth.sol";
import {DiamondFacadeLoupe} from "./utils/facade/DiamondFacadeLoupe.sol";
import {DiamondContract} from "./DiamondContract.sol";

abstract contract DiamondFacade is DiamondFacadeAuth, DiamondFacadeLoupe {
    bytes32 private immutable _this;
    address payable private app;

    constructor(bytes32 _key, address _app) payable {
        _this = _key;
        app = payable(_app);
    }

    fallback() external payable {
        address f = DiamondContract(app).facet(msg.sig);
        if (f == address(0)) {
            revert IDiamond.FunctionNotFound(msg.sig);
        }
        assembly {
            calldatacopy(0, 0, calldatasize())
            let r := delegatecall(gas(), f, 0, calldatasize(), 0, 0)
            // get any return value
            returndatacopy(0, 0, returndatasize())
            switch r
            case 0 {
                revert(0, returndatasize())
            }
            default {
                return(0, returndatasize())
            }
        }
    }

    receive() external payable {}
}
