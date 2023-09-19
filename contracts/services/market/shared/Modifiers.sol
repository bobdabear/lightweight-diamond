// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERROR} from "contracts/types/Error.sol";
import {Data} from "../Data.sol";

abstract contract Modifiers {
    using Data for address;
    using Data for Data.Storage;

    Data.Storage internal s;

    modifier auth() {
        if (!s.permission[msg.sender])
            revert ERROR.CODE(ERROR.TYPE.NO_PERMISSION);
        _;
    }
}
