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
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../../common";

export declare namespace IDiamond {
  export type FacetCutStruct = {
    facetAddress: AddressLike;
    action: BigNumberish;
    functionSelectors: BytesLike[];
  };

  export type FacetCutStructOutput = [
    facetAddress: string,
    action: bigint,
    functionSelectors: string[]
  ] & { facetAddress: string; action: bigint; functionSelectors: string[] };
}

export declare namespace IDiamondCut {
  export type DiamondArgsStruct = {
    owner: AddressLike;
    init: AddressLike;
    initCalldata: BytesLike;
  };

  export type DiamondArgsStructOutput = [
    owner: string,
    init: string,
    initCalldata: string
  ] & { owner: string; init: string; initCalldata: string };
}

export interface MarketInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "checkPermission(address)"
      | "checkPermission(bytes32,address)"
      | "facet(bytes4)"
      | "facet(bytes32,bytes4)"
      | "setInterface(bytes32,bytes4,bool)"
      | "setInterface(bytes4,bool)"
      | "setPermission(bytes32,address,bool)"
      | "setPermission(address,bool)"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "DiamondCut" | "OwnershipTransferred"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "checkPermission(address)",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "checkPermission(bytes32,address)",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "facet(bytes4)",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "facet(bytes32,bytes4)",
    values: [BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setInterface(bytes32,bytes4,bool)",
    values: [BytesLike, BytesLike, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "setInterface(bytes4,bool)",
    values: [BytesLike, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "setPermission(bytes32,address,bool)",
    values: [BytesLike, AddressLike, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "setPermission(address,bool)",
    values: [AddressLike, boolean]
  ): string;

  decodeFunctionResult(
    functionFragment: "checkPermission(address)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "checkPermission(bytes32,address)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "facet(bytes4)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "facet(bytes32,bytes4)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setInterface(bytes32,bytes4,bool)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setInterface(bytes4,bool)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setPermission(bytes32,address,bool)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setPermission(address,bool)",
    data: BytesLike
  ): Result;
}

export namespace DiamondCutEvent {
  export type InputTuple = [
    _diamondCut: IDiamond.FacetCutStruct[],
    _init: AddressLike,
    _calldata: BytesLike
  ];
  export type OutputTuple = [
    _diamondCut: IDiamond.FacetCutStructOutput[],
    _init: string,
    _calldata: string
  ];
  export interface OutputObject {
    _diamondCut: IDiamond.FacetCutStructOutput[];
    _init: string;
    _calldata: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface Market extends BaseContract {
  connect(runner?: ContractRunner | null): Market;
  waitForDeployment(): Promise<this>;

  interface: MarketInterface;

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

  "checkPermission(address)": TypedContractMethod<
    [_owner: AddressLike],
    [boolean],
    "view"
  >;

  "checkPermission(bytes32,address)": TypedContractMethod<
    [_service: BytesLike, _owner: AddressLike],
    [boolean],
    "view"
  >;

  "facet(bytes4)": TypedContractMethod<[_funct: BytesLike], [string], "view">;

  "facet(bytes32,bytes4)": TypedContractMethod<
    [_service: BytesLike, _funct: BytesLike],
    [string],
    "view"
  >;

  "setInterface(bytes32,bytes4,bool)": TypedContractMethod<
    [_service: BytesLike, _funct: BytesLike, _state: boolean],
    [void],
    "nonpayable"
  >;

  "setInterface(bytes4,bool)": TypedContractMethod<
    [_funct: BytesLike, _state: boolean],
    [void],
    "nonpayable"
  >;

  "setPermission(bytes32,address,bool)": TypedContractMethod<
    [_service: BytesLike, _owner: AddressLike, _permission: boolean],
    [void],
    "nonpayable"
  >;

  "setPermission(address,bool)": TypedContractMethod<
    [_owner: AddressLike, _permission: boolean],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "checkPermission(address)"
  ): TypedContractMethod<[_owner: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "checkPermission(bytes32,address)"
  ): TypedContractMethod<
    [_service: BytesLike, _owner: AddressLike],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "facet(bytes4)"
  ): TypedContractMethod<[_funct: BytesLike], [string], "view">;
  getFunction(
    nameOrSignature: "facet(bytes32,bytes4)"
  ): TypedContractMethod<
    [_service: BytesLike, _funct: BytesLike],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "setInterface(bytes32,bytes4,bool)"
  ): TypedContractMethod<
    [_service: BytesLike, _funct: BytesLike, _state: boolean],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setInterface(bytes4,bool)"
  ): TypedContractMethod<
    [_funct: BytesLike, _state: boolean],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setPermission(bytes32,address,bool)"
  ): TypedContractMethod<
    [_service: BytesLike, _owner: AddressLike, _permission: boolean],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setPermission(address,bool)"
  ): TypedContractMethod<
    [_owner: AddressLike, _permission: boolean],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "DiamondCut"
  ): TypedContractEvent<
    DiamondCutEvent.InputTuple,
    DiamondCutEvent.OutputTuple,
    DiamondCutEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;

  filters: {
    "DiamondCut(tuple[],address,bytes)": TypedContractEvent<
      DiamondCutEvent.InputTuple,
      DiamondCutEvent.OutputTuple,
      DiamondCutEvent.OutputObject
    >;
    DiamondCut: TypedContractEvent<
      DiamondCutEvent.InputTuple,
      DiamondCutEvent.OutputTuple,
      DiamondCutEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
  };
}
