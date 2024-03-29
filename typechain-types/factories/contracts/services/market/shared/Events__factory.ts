/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../../common";
import type {
  Events,
  EventsInterface,
} from "../../../../../contracts/services/market/shared/Events";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_market",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_base",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_quote",
        type: "address",
      },
    ],
    name: "MarketOpen",
    type: "event",
  },
] as const;

const _bytecode =
  "0x60566050600b82828239805160001a6073146043577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220b3c673d2d3e521806efadd88b6c57700b7f4900720aa8daaa0e334a34e2e328164736f6c63430008140033";

type EventsConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: EventsConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Events__factory extends ContractFactory {
  constructor(...args: EventsConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      Events & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Events__factory {
    return super.connect(runner) as Events__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): EventsInterface {
    return new Interface(_abi) as EventsInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Events {
    return new Contract(address, _abi, runner) as unknown as Events;
  }
}
