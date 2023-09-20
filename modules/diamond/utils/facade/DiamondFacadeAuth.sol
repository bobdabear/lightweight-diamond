// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.19;

/******************************************************************************\
* Author: Nick Mudge <nick@perfectabstractions.com>, Twitter/Github: @mudgen
* Modifier : Coinmeca Team <contact@coinmeca.net>
* Lightweight version of EIP-2535 Diamonds
/******************************************************************************/

import {IDiamond} from "../../interfaces/IDiamond.sol";
import {IDiamondCut} from "../../interfaces/IDiamondCut.sol";

import {DiamondAuth} from "../DiamondAuth.sol";
import {DiamondContractManager} from "../../DiamondContractManager.sol";

abstract contract DiamondFacadeAuth {
    using DiamondContractManager for bytes32;
    using DiamondContractManager for DiamondContractManager.Data;

    bytes32 private immutable _this;
    address payable private app;

    constructor(bytes32 _key) {
        _this = _key;
    }

    function setOwner(address _owner) public virtual {
        DiamondAuth(app).setOwner(_this, _owner);
    }

    function setPermission(address _owner, bool _permission) public virtual {
        DiamondAuth(app).setPermission(_this, _owner, _permission);
    }

    function checkPermission(
        address _owner
    ) public view virtual returns (bool) {
        return DiamondAuth(app).checkPermission(_this, _owner);
    }
}
