// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.19;

/******************************************************************************\
* Author: Nick Mudge <nick@perfectabstractions.com>, Twitter/Github: @mudgen
* Modifier : Coinmeca Team <contact@coinmeca.net>
* Lightweight version of EIP-2535 Diamonds 
/******************************************************************************/

import {IDiamond} from './interfaces/IDiamond.sol';
import {IDiamondCut} from './interfaces/IDiamondCut.sol';
import {DiamondContract} from './DiamondContract.sol';

import 'hardhat/console.sol';

abstract contract DiamondFacade {
    bytes32 private immutable _this;
    address payable private immutable app;

    constructor(bytes32 _key, address _app) payable {
        _this = _key;
        app = payable(_app);
    }

    function facet(bytes4 _funct) public view virtual returns (address) {
        return DiamondContract(app).facet(_this, _funct);
    }

    function setInterface(bytes4 _funct, bool _state) public virtual {
        DiamondContract(app).setInterface(_this, _funct, _state);
    }

    function setPermission(address _owner, bool _permission) public virtual{
        DiamondContract(app).setPermission(_this, _owner, _permission);
    }
    
    function checkPermission(address _owner) public virtual view returns (bool) {
        return DiamondContract(app).checkPermission(_this, _owner);
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
