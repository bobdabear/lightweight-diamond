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

abstract contract DiamondLoupe {
    using DiamondContractManager for bytes32;
    using DiamondContractManager for DiamondContractManager.Data;

    bytes32 private immutable _this;

    constructor(bytes32 _key) {
        _this = _key;
    }

    function functs(address _facet) public view returns (bytes4[] memory) {
        return _this.functs(_facet);
    }

    function functs(
        bytes32 _service,
        address _facet
    ) public view returns (bytes4[] memory) {
        return _service.functs(_facet);
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

    function facets() public view virtual returns (address[] memory) {
        return _this.facets();
    }

    function facets(
        bytes32 _service
    ) public view virtual returns (address[] memory) {
        return _service.facets();
    }

    function getFacets()
        public
        view
        returns (DiamondContractManager.Facet[] memory facets_)
    {
        return _this.getFacets();
    }

    function getFacets(
        bytes32 _service
    ) public view returns (DiamondContractManager.Facet[] memory facets_) {
        return _service.getFacets();
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

    function checkInterface(bytes4 _interface) public virtual returns (bool) {
        return _this.checkInterface(_interface);
    }

    function checkInterface(
        bytes32 _service,
        bytes4 _interface
    ) public virtual returns (bool) {
        return _service.checkInterface(_interface);
    }
}
