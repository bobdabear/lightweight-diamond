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
  Order,
  OrderInterface,
} from "../../../../../contracts/services/orderbook/facets/Order";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_type",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
    ],
    name: "order",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061029c806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c80635a5e5cc014610030575b600080fd5b61004a6004803603810190610045919061016d565b61004c565b005b60008260ff1603610067576064600060030181905550610088565b60018260ff1603610087576100868160006100a590919063ffffffff16565b5b5b60006002016000815461009a906101dc565b919050819055505050565b6100b881836100c590919063ffffffff16565b6100c1826100de565b5050565b6002816100d29190610224565b82600301819055505050565b80600201600081546100ef906101dc565b9190508190555050565b600080fd5b600060ff82169050919050565b610114816100fe565b811461011f57600080fd5b50565b6000813590506101318161010b565b92915050565b6000819050919050565b61014a81610137565b811461015557600080fd5b50565b60008135905061016781610141565b92915050565b60008060408385031215610184576101836100f9565b5b600061019285828601610122565b92505060206101a385828601610158565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006101e782610137565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610219576102186101ad565b5b600182019050919050565b600061022f82610137565b915061023a83610137565b925082820261024881610137565b9150828204841483151761025f5761025e6101ad565b5b509291505056fea2646970667358221220c63db19979be4e7f85b5dbd11092beec420332988da7f3b18bcb08742faf624664736f6c63430008140033";

type OrderConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: OrderConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Order__factory extends ContractFactory {
  constructor(...args: OrderConstructorParams) {
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
      Order & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Order__factory {
    return super.connect(runner) as Order__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): OrderInterface {
    return new Interface(_abi) as OrderInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Order {
    return new Contract(address, _abi, runner) as unknown as Order;
  }
}
