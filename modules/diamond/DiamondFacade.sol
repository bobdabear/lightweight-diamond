// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.19;

/******************************************************************************\
* Author: Nick Mudge <nick@perfectabstractions.com>, Twitter/Github: @mudgen
* Modifier : Coinmeca Team <contact@coinmeca.net>
* Lightweight version of EIP-2535 Diamonds
\******************************************************************************/

import {IDiamond} from "./interfaces/IDiamond.sol";
import {IDiamondCut} from "./interfaces/IDiamondCut.sol";

import {DiamondFacadeBase} from "./utils/facade/DiamondFacadeBase.sol";
import {DiamondFacadeAuth} from "./utils/facade/DiamondFacadeAuth.sol";
import {DiamondFacadeLoupe} from "./utils/facade/DiamondFacadeLoupe.sol";

import {DiamondGuard} from "./utils/DiamondGuard.sol";
import {DiamondContract} from "./DiamondContract.sol";

abstract contract DiamondFacade is DiamondFacadeAuth, DiamondFacadeLoupe {
    constructor(
        bytes32 _key,
        address _app
    ) payable DiamondFacadeBase(_key, _app) {}
}
