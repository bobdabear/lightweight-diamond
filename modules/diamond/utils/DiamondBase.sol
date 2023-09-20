// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.19;

/******************************************************************************\
* Author: Nick Mudge <nick@perfectabstractions.com>, Twitter/Github: @mudgen
* Modifier : Coinmeca Team <contact@coinmeca.net>
* Lightweight version of EIP-2535 Diamonds
\******************************************************************************/

import {IDiamond} from "../interfaces/IDiamond.sol";
import {IDiamondCut} from "../interfaces/IDiamondCut.sol";

import {DiamondContractManager} from "../DiamondContractManager.sol";
import {DiamondGuard} from "./DiamondGuard.sol";

abstract contract DiamondBase is DiamondGuard {
    using DiamondContractManager for bytes32;
    using DiamondContractManager for DiamondContractManager.Data;

    bytes32 immutable _this;

    constructor(
        bytes32 _key,
        IDiamondCut.FacetCut[] memory _diamondCut,
        IDiamondCut.DiamondArgs memory _args
    ) {
        _this = _key;
        _this.setOwner(msg.sender);
        _this.setPermission(_args.owner, true);
        _this.setPermission(address(this), true);
        _this.diamondCut(_diamondCut, _args.init, _args.initCalldata);
    }

    fallback() external payable virtual guard {
        DiamondContractManager.Data storage $;
        bytes32 __ = _this;
        assembly {
            $.slot := __
        }
        bytes4 b = msg.sig;
        address f = $.funct[b].facet;
        if (f == address(0)) {
            revert IDiamond.FunctionNotFound(b);
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

    receive() external payable virtual guard {}
}
