// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.19;

/******************************************************************************\
* Author: Nick Mudge <nick@perfectabstractions.com>, Twitter/Github: @mudgen
* Modifier : Coinmeca Team <contact@coinmeca.net>
* Lightweight version of EIP-2535 Diamonds
\******************************************************************************/

import {IDiamond} from "./interfaces/IDiamond.sol";
import {IDiamondCut} from "./interfaces/IDiamondCut.sol";

import {DiamondBase} from "./utils/DiamondBase.sol";
import {DiamondAuth} from "./utils/DiamondAuth.sol";
import {DiamondLoupe} from "./utils/DiamondLoupe.sol";
import {DiamondGuard} from "./utils/DiamondGuard.sol";

import {DiamondContractManager} from "./DiamondContractManager.sol";

abstract contract DiamondContract is DiamondAuth, DiamondLoupe {
    using DiamondContractManager for bytes32;
    using DiamondContractManager for DiamondContractManager.Data;

    constructor(
        bytes32 _key,
        IDiamondCut.FacetCut[] memory _diamondCut,
        IDiamondCut.DiamondArgs memory _args
    ) payable DiamondBase(_key, _diamondCut, _args) {}
}
