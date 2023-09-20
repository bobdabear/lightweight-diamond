// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.19;

/******************************************************************************\
* Author: Nick Mudge <nick@perfectabstractions.com>, Twitter/Github: @mudgen
* Modifier : Coinmeca Team <contact@coinmeca.net>
* Lightweight version of EIP-2535 Diamonds
/******************************************************************************/

import {IDiamond} from "../interfaces/IDiamond.sol";
import {IDiamondCut} from "../interfaces/IDiamondCut.sol";
import {DiamondContractManager} from "../DiamondContractManager.sol";

abstract contract DiamondAuth {
    using DiamondContractManager for bytes32;
    using DiamondContractManager for DiamondContractManager.Data;

    bytes32 private immutable _this;

    constructor(bytes32 _key) {
        _this = _key;
    }

    function setOwner(address _owner) public virtual {
        _this.setOwner(_owner);
    }

    function setOwner(bytes32 _service, address _owner) public virtual {
        _service.setOwner(_owner);
    }

    function setPermission(address _owner, bool _permission) public virtual {
        _this.setPermission(_owner, _permission);
    }

    function setPermission(
        bytes32 _service,
        address _owner,
        bool _permission
    ) public virtual {
        _service.setPermission(_owner, _permission);
    }

    function checkPermission(
        address _owner
    ) public view virtual returns (bool) {
        return _this.contract_().checkPermission(_this, _owner);
    }

    function checkPermission(
        bytes32 _service,
        address _owner
    ) public view virtual returns (bool) {
        return _service.contract_().checkPermission(_service, _owner);
    }
}
