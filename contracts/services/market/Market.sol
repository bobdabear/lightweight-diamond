// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.19;

import {IDiamondCut} from 'modules/diamond/interfaces/IDiamondCut.sol';
import {DiamondContract} from 'modules/diamond/DiamondContract.sol';

import {Data} from './Data.sol';

contract Market is DiamondContract {
    using Data for Data.Storage;

    Data.Storage internal s;

    constructor(
        IDiamondCut.FacetCut[] memory _diamondCut,
        IDiamondCut.DiamondArgs memory _args
    ) DiamondContract(keccak256('market.storage'), _diamondCut, _args) {
        s.permission[msg.sender] = true;
    }
}
