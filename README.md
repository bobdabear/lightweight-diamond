# Light-weight Diamond Pattern

## Overview

This project was created to make it easier to use the diamond pattern through abstract implementation and inheritance.

### Structure

Functions are spread out from the one single contract as facets in the diamond pattern. Categorizing contracts with just types such as 'interfaces' or 'libraries' would make a project more complex. So in this case suggest to use like a grouping like a family according to their function's same point of features. This hierarchy and its folder structure follow:

```
─ contracts
  └─ services
     ├─ service1
     │  ├─ `Service.sol` : Diamond contract
     │  ├─ `IService.sol` : Interface that combine with all of facet's functions for diamond contract
     │  ├─ `Data.sol` : Data storage for diamond contract
     │  ┣─ shared : Shared functions between facets
     │  │  ├─ `Modifers.sol` : Modifier functions for facets
     │  │  ├─ `Events.sol` : Events for facets
     │  │  └─ `Internals.sol` : Shared functions as internal for facets
     │  └─ facets : Facets
     │     ├─ `Facet1.sol`
     │     ├─ `Facet2.sol`
     │     └─ `Facet3.sol`
     │
     ├─ service2
     ：
```

`modules`: The `modules` folder is similar to `node_modules`. This is a folder that contains template contracts with ready-made functions that we need to refer to and use through importing. The light-weight version of the Diamond contract we use is located here.

## Concept

This example was created to help implement diamond patterns easily. Also, if you want to provide clear addresses to separate the touchpoints with which users will interact, you can implement a diamond pattern that shares functionality but has different data storage.

In this example repository, facet management and state value management storage are used separately. Storage for diamond or facet management is created through `DiamondContractManger`, which is only used for adding and managing facets. The unique state value of a specific diamond is managed by [Data.sol](contracts/services/market/Data.sol).

-   `DiamondContract` : It is an abstracted contract with a constructor and fallback and receive functions to use the Diamond pattern. It has a separate `DiamondContractManger`.
-   `DiamondContractManager`: It has storage just for facet management along with the function to manage facets and owners included in the contract.
-   `DiamondFacade` : This is an abstraction contract provided for the creation of a diamond contract. It does not hold any storage or facets itself and acts as a relay that only holds 'fallback'.

### Inheriting and Implementation

This implementation simplifies building the diamond pattern through contract inheritance, as shown below:

```
import {DiamondContract} from "modules/diamond/DiamondContract.sol";

contract Service is DiamondContract
```

### PrivateKey for Storage

In the constructor, just simply set the service contract's key (slot position) for data storage.

```
contract Service is DiamondContract{
    constructor(uint _myValue1) DiamondContract(keccak256('myService.Storage'))
}
```

### Diamond Factory

This repository is an example to address the following needs:

-   In order for users to clearly distinguish and interact with a specific orderbook among orderbooks for various token pairs, a different address is required for each orderbook as an access point.
-   Each orderbook must have its own data storage and store real-time prices and orders in different storage, but share functionality.

For this purpose, this is an example of factoryizing a diamond contract called an orderbook.

`Market.sol (Diamond)` : A market contract serves several functions for the market and includes common orderbook facets.
`Orderbook.sol (Facade)` : It is a contract that does not itself have a facet for implementing any functionality. The facade only has the address of the parent diamond contract, and the parent holds the facade's facet instead.

Therefore, facades can be created infinitely, each with its own storage. However, since all of the facades' functions are managed by the parent diamond, multiple diamond functions can be updated and managed at once.

```
─ Market.sol (Diamond)
  ├─ Data.sol (Local Data Storage for Market)
  │  └─ local values for market contract only
  │
  └─ DiamondContractManager (Data Storage for Facets)
     ├─ Market facets
     └─ Orderbook facets  ◀─────────────────┐
                                            │
─ Orderbook 1 (Diamond Facade) ─────────────┤
  │  └─ local values for orderbook 1 only   │
  │                                         │
─ Orderbook 2 (Diamond Facade) ─────────────┘
  │  └─ local values for orderbook 2 only
　：
```

### Internal

The functions defined in `Internals.sol` are internal and cannot be accessed from outside the blockchain, but also define functions shared by functions of different Facets. You can find an example in [Internals.sol](contracts/services/orderbook/shared/Internals.sol).

```
import 'Data.sol';

library Internals {
    using Data for Data.Storage;
    using Internals for Data.Storage;

    function internalFunction1 (Data.Storage storage $, uint _value) internal {
      $.value = _value
    }

    function internalFunction2 (Data.Storage storage $, uint _value) internal view returns(uint) {
      return $.value;
    }
}
```

A use case for internal functions that need to be shared between facets can be found in [Internals.sol](contracts/services/orderbook/shared/Internals.sol), [Order.sol](contracts/services/orderbook/facets/Order.sol) and [Cancel.sol](contracts/services/orderbook/facets/Cancel.sol).

```
import {Data} from "../Data.sol";

library Internals {
  using Data for Data.Storage;
  using Internals for Data.Storage;

  function internalFunction (Storage storage $, uint _value) {
    $.myValue = _value
  }
}
```

```
import {Internals} from '../shared/Internals.sol'

contract FacetA {
    using Internals for Data.Storage;

    function functionFacetA (uint _value) {
      $.internalFunction(_value);
    }
}

contract FacetB{
    using Internals for Data.Storage;

    function functionFacetB (uint _value) {
      $.internalFunction(_value);
    }
}

```

For the public functions, you can use them by declaring them in an interface and referencing them.

```
interface IMarket {
  function facetAfunction() external;

  function facetBfunction() external;
}

MarketFacetA{
  funtionc facetAfunction() public {
    IMarket(address(this)).facetBfunction();
  }
}

MarketFacetB{
  funtionc facetBfunction() public {
    IMarket(address(this)).facetAfunction();
  }
}
```

### Data Storage

Storage that manages facets is automatically created through `DiamondContractManger` by inheriting `DiamondContract`. Separately from this, variables for state management targeting only specific services related to the business logic of the contract must form a separate `Data.sol` contract.

```
library Data {
  Storage {
    bool myValue1;
    uint myValue2;
    address myValue3;
  }

  function load() internal pure returns (Storage storage $) {
      bytes32 __ = key;
      assembly {
          $.slot := __
      }
  }
}
```

If you want to reference data storage in facets, they can be used in the following ways:

```
import {Data} './Data.sol';

contract MyContract{

  function myFunction() public returns (uint) {
    Data.Storage storage $ = Data.load();
    return $.myValue;
  }

  ...
}

```

Or, for easier use, you can more conveniently access storage from all facets with a single declaration in the Modifiers.sol contract that all facet contracts inherit.

```
import {Data} './Data.sol';

contract Modifiers {
  using Data for Data.Storage;
  Data.Storage internal $;
}

contract Facet1 is Modifiers{
  function Function1 () public {
    $.myValue + 1;
  }
}

contract Facet1 is Modifiers{
  function Function2 () public {
    $.myValue * 4;
  }
}

...

```

## Requirements

-   [Node.js 20+](https://nodejs.org)
-   [Yarn](https://yarnpkg.com/) _(NOTE: `npm` and `pnpm` can also be used)_

## Installation

Install after git clone:

```
yarn install
```

## Test

Test command:

```
yarn test test/test
```

## License

MIT - see [LICSENSE](LICENSE)
