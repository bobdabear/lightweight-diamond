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
  Create,
  CreateInterface,
} from "../../../../../contracts/services/market/facets/Create";

const _abi = [
  {
    inputs: [
      {
        internalType: "enum ERROR.TYPE",
        name: "__",
        type: "uint8",
      },
    ],
    name: "CODE",
    type: "error",
  },
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
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061154e806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063ffe5725f14610030575b600080fd5b61004a6004803603810190610045919061077e565b610060565b60405161005791906107e0565b60405180910390f35b60008060000160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166100f35760026040517f5a946a8f0000000000000000000000000000000000000000000000000000000081526004016100ea9190610872565b60405180910390fd5b600084848430604051610105906106d8565b610112949392919061089c565b604051809103906000f08015801561012e573d6000803e3d6000fd5b509050610149818686600061018f909392919063ffffffff16565b7f9d8dad09822291b5d53b3f29c58b49398f6b9793417152e254339a56201ece4c81868660405161017c939291906108e1565b60405180910390a1809150509392505050565b600073ffffffffffffffffffffffffffffffffffffffff168460010160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161461029f5760096040517f5a946a8f0000000000000000000000000000000000000000000000000000000081526004016102969190610872565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168460010160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146103af5760096040517f5a946a8f0000000000000000000000000000000000000000000000000000000081526004016103a69190610872565b60405180910390fd5b828460010160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550828460010160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508360020160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020839080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508360020160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020839080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555083600301839080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505050565b610c008061091983390190565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610715826106ea565b9050919050565b6107258161070a565b811461073057600080fd5b50565b6000813590506107428161071c565b92915050565b6000819050919050565b61075b81610748565b811461076657600080fd5b50565b60008135905061077881610752565b92915050565b600080600060608486031215610797576107966106e5565b5b60006107a586828701610733565b93505060206107b686828701610733565b92505060406107c786828701610769565b9150509250925092565b6107da8161070a565b82525050565b60006020820190506107f560008301846107d1565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b601f811061083b5761083a6107fb565b5b50565b600081905061084c8261082a565b919050565b600061085c8261083e565b9050919050565b61086c81610851565b82525050565b60006020820190506108876000830184610863565b92915050565b61089681610748565b82525050565b60006080820190506108b160008301876107d1565b6108be60208301866107d1565b6108cb604083018561088d565b6108d860608301846107d1565b95945050505050565b60006060820190506108f660008301866107d1565b61090360208301856107d1565b61091060408301846107d1565b94935050505056fe60c06040523480156200001157600080fd5b5060405162000c0038038062000c008339818101604052810190620000379190620001d7565b7f11e784ce1c49571f9642228fbdd2f52dff188042837f41ce2a0226ab7fa1fe088181608081815250508073ffffffffffffffffffffffffffffffffffffffff1660a08173ffffffffffffffffffffffffffffffffffffffff16815250505050836000800160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600060010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550816000600301819055505050505062000249565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620001648262000137565b9050919050565b620001768162000157565b81146200018257600080fd5b50565b60008151905062000196816200016b565b92915050565b6000819050919050565b620001b1816200019c565b8114620001bd57600080fd5b50565b600081519050620001d181620001a6565b92915050565b60008060008060808587031215620001f457620001f362000132565b5b6000620002048782880162000185565b9450506020620002178782880162000185565b93505060406200022a87828801620001c0565b92505060606200023d8782880162000185565b91505092959194509250565b60805160a0516109616200029f60003960008181604e015281816102970152818161035c0152818161041f01526104d20152600081816102d3015281816103980152818161045b015261050e01526109616000f3fe6080604052600436106100435760003560e01c806357d3a786146101c7578063851642bf14610204578063c0a43a7c14610241578063ec6263c01461026a5761004a565b3661004a57005b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663851642bf6000357fffffffff00000000000000000000000000000000000000000000000000000000166040518263ffffffff1660e01b81526004016100c991906105be565b602060405180830381865afa1580156100e6573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061010a919061063c565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036101a1576000357fffffffff00000000000000000000000000000000000000000000000000000000166040517f5416eb9800000000000000000000000000000000000000000000000000000000815260040161019891906105be565b60405180910390fd5b3660008037600080366000845af43d6000803e80600081146101c2573d6000f35b3d6000fd5b3480156101d357600080fd5b506101ee60048036038101906101e9919061067e565b610293565b6040516101fb91906106c6565b60405180910390f35b34801561021057600080fd5b5061022b6004803603810190610226919061070d565b610358565b6040516102389190610749565b60405180910390f35b34801561024d57600080fd5b5061026860048036038101906102639190610790565b61041d565b005b34801561027657600080fd5b50610291600480360381019061028c91906107d0565b6104d0565b005b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16635cc77dd37f0000000000000000000000000000000000000000000000000000000000000000846040518363ffffffff1660e01b8152600401610310929190610829565b602060405180830381865afa15801561032d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103519190610867565b9050919050565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663b15301047f0000000000000000000000000000000000000000000000000000000000000000846040518363ffffffff1660e01b81526004016103d5929190610894565b602060405180830381865afa1580156103f2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610416919061063c565b9050919050565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16638257735f7f000000000000000000000000000000000000000000000000000000000000000084846040518463ffffffff1660e01b815260040161049a939291906108bd565b600060405180830381600087803b1580156104b457600080fd5b505af11580156104c8573d6000803e3d6000fd5b505050505050565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663599e4c707f000000000000000000000000000000000000000000000000000000000000000084846040518463ffffffff1660e01b815260040161054d939291906108f4565b600060405180830381600087803b15801561056757600080fd5b505af115801561057b573d6000803e3d6000fd5b505050505050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b6105b881610583565b82525050565b60006020820190506105d360008301846105af565b92915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610609826105de565b9050919050565b610619816105fe565b811461062457600080fd5b50565b60008151905061063681610610565b92915050565b600060208284031215610652576106516105d9565b5b600061066084828501610627565b91505092915050565b60008135905061067881610610565b92915050565b600060208284031215610694576106936105d9565b5b60006106a284828501610669565b91505092915050565b60008115159050919050565b6106c0816106ab565b82525050565b60006020820190506106db60008301846106b7565b92915050565b6106ea81610583565b81146106f557600080fd5b50565b600081359050610707816106e1565b92915050565b600060208284031215610723576107226105d9565b5b6000610731848285016106f8565b91505092915050565b610743816105fe565b82525050565b600060208201905061075e600083018461073a565b92915050565b61076d816106ab565b811461077857600080fd5b50565b60008135905061078a81610764565b92915050565b600080604083850312156107a7576107a66105d9565b5b60006107b5858286016106f8565b92505060206107c68582860161077b565b9150509250929050565b600080604083850312156107e7576107e66105d9565b5b60006107f585828601610669565b92505060206108068582860161077b565b9150509250929050565b6000819050919050565b61082381610810565b82525050565b600060408201905061083e600083018561081a565b61084b602083018461073a565b9392505050565b60008151905061086181610764565b92915050565b60006020828403121561087d5761087c6105d9565b5b600061088b84828501610852565b91505092915050565b60006040820190506108a9600083018561081a565b6108b660208301846105af565b9392505050565b60006060820190506108d2600083018661081a565b6108df60208301856105af565b6108ec60408301846106b7565b949350505050565b6000606082019050610909600083018661081a565b610916602083018561073a565b61092360408301846106b7565b94935050505056fea264697066735822122088f50d0a845cf1c8cbf841f882ef24ad138bc671e34f1343352c176569a6465064736f6c63430008140033a2646970667358221220de894c3674906883b504fcc9fffb1ff49232e93782d49aa06a0253b6e3227f5e64736f6c63430008140033";

type CreateConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CreateConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Create__factory extends ContractFactory {
  constructor(...args: CreateConstructorParams) {
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
      Create & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Create__factory {
    return super.connect(runner) as Create__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CreateInterface {
    return new Interface(_abi) as CreateInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Create {
    return new Contract(address, _abi, runner) as unknown as Create;
  }
}
