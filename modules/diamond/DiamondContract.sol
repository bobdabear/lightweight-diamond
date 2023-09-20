// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.19;

/******************************************************************************\
* Author: Nick Mudge <nick@perfectabstractions.com>, Twitter/Github: @mudgen
* Modifier : Coinmeca Team <contact@coinmeca.net>
* Lightweight version of EIP-2535 Diamonds
/******************************************************************************/

import {IDiamond} from "./interfaces/IDiamond.sol";
import {IDiamondCut} from "./interfaces/IDiamondCut.sol";

import {DiamondAuth} from "./utils/DiamondAuth.sol";
import {DiamondLoupe} from "./utils/DiamondLoupe.sol";
import {DiamondContractManager} from "./DiamondContractManager.sol";

import "hardhat/console.sol";

abstract contract DiamondContract is DiamondAuth, DiamondLoupe {
    using DiamondContractManager for bytes32;
    using DiamondContractManager for DiamondContractManager.Data;

    bytes32 private immutable _this;
    bool reentrancy;

    constructor(
        bytes32 _key,
        IDiamondCut.FacetCut[] memory _diamondCut,
        IDiamondCut.DiamondArgs memory _args
    ) payable {
        _this = _key;

        _this.setOwner(msg.sender);
        _this.setPermission(address(this), true);
        _this.setPermission(_args.owner, true);
        _this.diamondCut(_diamondCut, _args.init, _args.initCalldata);
    }

    fallback() external payable virtual {
        DiamondContractManager.Data storage $;
        bytes32 slot = _this;
        assembly {
            $.slot := slot
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

    receive() external payable virtual {}
}
