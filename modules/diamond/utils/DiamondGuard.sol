// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.19;

/******************************************************************************\
* Author: Nick Mudge <nick@perfectabstractions.com>, Twitter/Github: @mudgen
* Modifier : Coinmeca Team <contact@coinmeca.net>
* Lightweight version of EIP-2535 Diamonds
\******************************************************************************/

abstract contract DiamondGuard {
    bool private process;

    modifier guard() {
        if (!process) {
            process = true;
            _;
            // process = false;
        } else {
            // revert("Processing...");
        }
    }
}
