/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IDiamondCut,
  IDiamondCutInterface,
} from "../../../../modules/diamond/interfaces/IDiamondCut";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "_selector",
        type: "bytes4",
      },
    ],
    name: "CannotAddFunctionToDiamondThatAlreadyExists",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes4[]",
        name: "_selectors",
        type: "bytes4[]",
      },
    ],
    name: "CannotAddSelectorsToZeroAddress",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "_selector",
        type: "bytes4",
      },
    ],
    name: "CannotRemoveFunctionThatDoesNotExist",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "_selector",
        type: "bytes4",
      },
    ],
    name: "CannotRemoveImmutableFunction",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "_selector",
        type: "bytes4",
      },
    ],
    name: "CannotReplaceFunctionThatDoesNotExists",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "_selector",
        type: "bytes4",
      },
    ],
    name: "CannotReplaceFunctionWithTheSameFunctionFromTheSameFacet",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes4[]",
        name: "_selectors",
        type: "bytes4[]",
      },
    ],
    name: "CannotReplaceFunctionsFromFacetWithZeroAddress",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "_selector",
        type: "bytes4",
      },
    ],
    name: "CannotReplaceImmutableFunction",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "_functionSelector",
        type: "bytes4",
      },
    ],
    name: "FunctionNotFound",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_action",
        type: "uint8",
      },
    ],
    name: "IncorrectFacetCutAction",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_initializationContractAddress",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_calldata",
        type: "bytes",
      },
    ],
    name: "InitializationFunctionReverted",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contractAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "_message",
        type: "string",
      },
    ],
    name: "NoBytecodeAtAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "NoSelectorsGivenToAdd",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_facetAddress",
        type: "address",
      },
    ],
    name: "NoSelectorsProvidedForFacetForCut",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "address",
        name: "_contractOwner",
        type: "address",
      },
    ],
    name: "NotContractOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_sender",
        type: "address",
      },
    ],
    name: "PermissionDenied",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_facetAddress",
        type: "address",
      },
    ],
    name: "RemoveFacetAddressMustBeZeroAddress",
    type: "error",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "facetAddress",
            type: "address",
          },
          {
            internalType: "enum IDiamond.FacetCutAction",
            name: "action",
            type: "uint8",
          },
          {
            internalType: "bytes4[]",
            name: "functionSelectors",
            type: "bytes4[]",
          },
        ],
        internalType: "struct IDiamond.FacetCut[]",
        name: "_diamondCut",
        type: "tuple[]",
      },
      {
        internalType: "address",
        name: "_init",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_calldata",
        type: "bytes",
      },
    ],
    name: "diamondCut",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IDiamondCut__factory {
  static readonly abi = _abi;
  static createInterface(): IDiamondCutInterface {
    return new Interface(_abi) as IDiamondCutInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): IDiamondCut {
    return new Contract(address, _abi, runner) as unknown as IDiamondCut;
  }
}
