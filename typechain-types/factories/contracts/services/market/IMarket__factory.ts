/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IMarket,
  IMarketInterface,
} from "../../../../contracts/services/market/IMarket";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_base",
        type: "address",
      },
      {
        internalType: "address",
        name: "_quote",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_initialPrice",
        type: "uint256",
      },
    ],
    name: "create",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllMarkets",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "getMarketsFor",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_base",
        type: "address",
      },
      {
        internalType: "address",
        name: "_quote",
        type: "address",
      },
    ],
    name: "getOrderbook",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class IMarket__factory {
  static readonly abi = _abi;
  static createInterface(): IMarketInterface {
    return new Interface(_abi) as IMarketInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): IMarket {
    return new Contract(address, _abi, runner) as unknown as IMarket;
  }
}
