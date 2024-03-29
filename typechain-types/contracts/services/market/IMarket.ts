/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../../../common";

export interface IMarketInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "create"
      | "getAllMarkets"
      | "getMarketsFor"
      | "getOrderbook"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "create",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getAllMarkets",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getMarketsFor",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getOrderbook",
    values: [AddressLike, AddressLike]
  ): string;

  decodeFunctionResult(functionFragment: "create", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getAllMarkets",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMarketsFor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getOrderbook",
    data: BytesLike
  ): Result;
}

export interface IMarket extends BaseContract {
  connect(runner?: ContractRunner | null): IMarket;
  waitForDeployment(): Promise<this>;

  interface: IMarketInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  create: TypedContractMethod<
    [_base: AddressLike, _quote: AddressLike, _initialPrice: BigNumberish],
    [string],
    "nonpayable"
  >;

  getAllMarkets: TypedContractMethod<[], [string[]], "view">;

  getMarketsFor: TypedContractMethod<[_token: AddressLike], [string[]], "view">;

  getOrderbook: TypedContractMethod<
    [_base: AddressLike, _quote: AddressLike],
    [string],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "create"
  ): TypedContractMethod<
    [_base: AddressLike, _quote: AddressLike, _initialPrice: BigNumberish],
    [string],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getAllMarkets"
  ): TypedContractMethod<[], [string[]], "view">;
  getFunction(
    nameOrSignature: "getMarketsFor"
  ): TypedContractMethod<[_token: AddressLike], [string[]], "view">;
  getFunction(
    nameOrSignature: "getOrderbook"
  ): TypedContractMethod<
    [_base: AddressLike, _quote: AddressLike],
    [string],
    "view"
  >;

  filters: {};
}
