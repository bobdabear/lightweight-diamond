// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Data} from '../Data.sol';

library Internals{
    using Data for Data.Storage;
    using Internals for Data.Storage;

    function matching(Data.Storage storage s, uint _price) internal {
        s.price = _price * 2;
    }

    function fill(Data.Storage storage s) internal {
        ++s.tick;
    }
    
    function execute(Data.Storage storage s, uint _price) internal {
        s.matching(_price);
        s.fill();
    }
}