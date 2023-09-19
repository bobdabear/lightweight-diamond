// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Modifiers} from '../shared/Modifiers.sol';
import {Internals} from '../shared/Internals.sol';
import {Data} from '../Data.sol';

contract Cancel is Modifiers{
    using Internals for Data.Storage;

    function cancel() public {
        if(s.tick > 0) --s.tick;
        s.price = 0;
    }

    function liquidation(uint _price) public{
        s.matching(_price);
    }
}