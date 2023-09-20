// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.19;

/******************************************************************************\
* Author: Nick Mudge <nick@perfectabstractions.com>, Twitter/Github: @mudgen
* Modifier : Coinmeca Team <contact@coinmeca.net>
* Lightweight version of EIP-2535 Diamonds
\******************************************************************************/

import {DiamondAuth} from "../DiamondAuth.sol";
import {DiamondFacadeBase} from "./DiamondFacadeBase.sol";

abstract contract DiamondFacadeAuth is DiamondFacadeBase {
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
