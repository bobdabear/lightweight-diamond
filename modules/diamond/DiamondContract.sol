// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.19;

/******************************************************************************\
* Author: Nick Mudge <nick@perfectabstractions.com>, Twitter/Github: @mudgen
* Modifier : Coinmeca Team <contact@coinmeca.net>
* Lightweight version of EIP-2535 Diamonds
/******************************************************************************/

import {IDiamond} from "./interfaces/IDiamond.sol";
import {IDiamondCut} from "./interfaces/IDiamondCut.sol";
import {DiamondContractManager} from "./DiamondContractManager.sol";

abstract contract DiamondContract {
    using DiamondContractManager for bytes32;
    using DiamondContractManager for DiamondContractManager.Data;

    bytes32 immutable _this;

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

    function facet(bytes4 _funct) public view virtual returns (address) {
        return _this.facet(_funct);
    }

    function facet(
        bytes32 _service,
        bytes4 _funct
    ) public view virtual returns (address) {
        return _service.facet(_funct);
    }

    function setInterface(bytes4 _funct, bool _state) public virtual {
        _this.setInterface(_funct, _state);
    }

    function setInterface(
        bytes32 _service,
        bytes4 _funct,
        bool _state
    ) public virtual {
        _service.setInterface(_funct, _state);
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

    fallback() external payable virtual {
        DiamondContractManager.Data storage $;
        bytes32 slot = _this;
        assembly {
            $.slot := slot
        }
        address f = $.facet[msg.sig].addr;
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

    receive() external payable virtual {}
}
