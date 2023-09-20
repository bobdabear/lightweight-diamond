// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.19;

/******************************************************************************\
* Author: Nick Mudge <nick@perfectabstractions.com>, Twitter/Github: @mudgen
* Modifier : Coinmeca Team <contact@coinmeca.net>
* Lightweight version of EIP-2535 Diamonds
\******************************************************************************/

import {DiamondContractManager} from "../../DiamondContractManager.sol";
import {DiamondLoupe} from "../DiamondLoupe.sol";
import {DiamondFacadeBase} from "./DiamondFacadeBase.sol";

abstract contract DiamondFacadeLoupe is DiamondFacadeBase {
    function functs(address _facet) public view returns (bytes4[] memory) {
        return DiamondLoupe(app).functs(_this, _facet);
    }

    function facet(bytes4 _funct) public view virtual returns (address) {
        return DiamondLoupe(app).facet(_this, _funct);
    }

    function facets() public view virtual returns (address[] memory) {
        return DiamondLoupe(app).facets(_this);
    }

    function getFacets()
        public
        view
        returns (DiamondContractManager.Facet[] memory facets_)
    {
        return DiamondLoupe(app).getFacets(_this);
    }

    function setInterface(bytes4 _funct, bool _state) public virtual {
        DiamondLoupe(app).setInterface(_this, _funct, _state);
    }

    function checkInterface(bytes4 _interface) public virtual returns (bool) {
        return DiamondLoupe(app).checkInterface(_this, _interface);
    }
}
