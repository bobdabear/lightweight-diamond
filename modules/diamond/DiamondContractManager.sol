// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.19;

/******************************************************************************\
* Author: Nick Mudge <nick@perfectabstractions.com>, Twitter/Github: @mudgen
* Modifier : Coinmeca Team <contact@coinmeca.net>
* Lightweight version of EIP-2535 Diamonds
/******************************************************************************/

import {IDiamond} from './interfaces/IDiamond.sol';
import {IDiamondCut} from './interfaces/IDiamondCut.sol';

library DiamondContractManager {
    using DiamondContractManager for DiamondContractManager.Data;

    struct Facet {
        address addr;
        uint16 position;
    }

    struct Data {
        address owner;
        mapping(bytes4 => Facet) facet;
        bytes4[] functs;
        mapping(bytes32 => mapping(bytes4 => bool)) interfaces;
        mapping(bytes32 => mapping(address => bool)) permission;
    }

    function contract_(bytes32 _contract) internal pure returns (Data storage c) {
        assembly {
            c.slot := _contract
        }
    }

    function facet(bytes32 _contract, bytes4 _funct) internal view returns (address) {
        return contract_(_contract).facet[_funct].addr;
    }

    function setInterface(bytes32 _contract, bytes4 _funct, bool _state) internal {
        Data storage c = contract_(_contract);
        c.checkPermission(_contract, msg.sender);
        c.interfaces[_contract][_funct] = _state;
    }
    
    function setOwner(bytes32 _contract, address _owner) internal {
        Data storage c = contract_(_contract);
        emit OwnershipTransferred(c.owner, _owner);
        c.owner = _owner;
    }

    function owner(bytes32 _contract) internal view returns (address _owner) {
        _owner = contract_(_contract).owner;
    }

    function enforceIsContractOwner(bytes32 _contract) internal view {
        if (msg.sender != contract_(_contract).owner) {
            revert IDiamond.NotContractOwner(msg.sender, contract_(_contract).owner);
        }
    }

    function setPermission(bytes32 _contract, address _owner, bool _permission) internal {
        Data storage c = contract_(_contract);
        c.checkPermission(_contract, msg.sender);
        c.permission[_contract][_owner] = _permission;
    }

    function checkPermission(Data storage c, bytes32 _contract, address _owner) internal view returns (bool check) {
        check = _owner != c.owner && !c.permission[_contract][_owner];
        if (check) revert IDiamond.PermissionDenied(_owner);
        return check;
    }

    event DiamondCut(IDiamondCut.FacetCut[] _diamondCut, address _init, bytes _calldata);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    // Internal function version of diamondCut
    function diamondCut(bytes32 _contract, IDiamondCut.FacetCut[] memory _diamondCut, address _init, bytes memory _calldata) internal {
        for (uint i; i < _diamondCut.length; ++i) {
            bytes4[] memory functs = _diamondCut[i].functionSelectors;
            address facet_ = _diamondCut[i].facetAddress;
            if (functs.length == 0) {
                revert IDiamond.NoSelectorsProvidedForFacetForCut(facet_);
            }
            IDiamondCut.FacetCutAction action = _diamondCut[i].action;
            if (action == IDiamond.FacetCutAction.Add) {
                addFunctions(_contract, facet_, functs);
            } else if (action == IDiamond.FacetCutAction.Replace) {
                replaceFunctions(_contract, facet_, functs);
            } else if (action == IDiamond.FacetCutAction.Remove) {
                removeFunctions(_contract, facet_, functs);
            } else {
                revert IDiamond.IncorrectFacetCutAction(uint8(action));
            }
        }
        emit DiamondCut(_diamondCut, _init, _calldata);
        initializeDiamondCut(_init, _calldata);
    }

    function addFunctions(bytes32 _contract, address _facet, bytes4[] memory _functs) internal {
        if (_facet == address(0)) {
            revert IDiamond.CannotAddSelectorsToZeroAddress(_functs);
        }
        Data storage c = contract_(_contract);
        uint16 position = uint16(c.functs.length);
        enforceHasContractCode(_facet, 'LibDiamondCut: Add facet has no code');
        for (uint i; i < _functs.length; ++i) {
            bytes4 funct = _functs[i];
            address facet_ = c.facet[funct].addr;
            if (facet_ != address(0)) {
                revert IDiamond.CannotAddFunctionToDiamondThatAlreadyExists(funct);
            }
            c.facet[funct] = Facet(_facet, position);
            c.functs.push(funct);
            ++position;
        }
    }

    function replaceFunctions(bytes32 _contract, address _facet, bytes4[] memory _functs) internal {
        Data storage c = contract_(_contract);
        if (_facet == address(0)) {
            revert IDiamond.CannotReplaceFunctionsFromFacetWithZeroAddress(_functs);
        }
        enforceHasContractCode(_facet, 'LibDiamondCut: Replace facet has no code');
        for (uint i; i < _functs.length; ++i) {
            bytes4 funct = _functs[i];
            address facet_ = c.facet[funct].addr;
            // can't replace immutable functions -- functions defined directly in the diamond in this case
            if (facet_ == address(this)) {
                revert IDiamond.CannotReplaceImmutableFunction(funct);
            }
            if (facet_ == _facet) {
                revert IDiamond.CannotReplaceFunctionWithTheSameFunctionFromTheSameFacet(funct);
            }
            if (facet_ == address(0)) {
                revert IDiamond.CannotReplaceFunctionThatDoesNotExists(funct);
            }
            // replace old facet address
            c.facet[funct].addr = _facet;
        }
    }

    function removeFunctions(bytes32 _contract, address _facet, bytes4[] memory _functs) internal {
        Data storage c = contract_(_contract);
        uint position = c.functs.length;
        if (_facet != address(0)) {
            revert IDiamond.RemoveFacetAddressMustBeZeroAddress(_facet);
        }
        for (uint i; i < _functs.length; ++i) {
            bytes4 funct = _functs[i];
            Facet memory old = c.facet[funct];
            if (old.addr == address(0)) {
                revert IDiamond.CannotRemoveFunctionThatDoesNotExist(funct);
            }

            // can't remove immutable functions -- functions defined directly in the diamond
            if (old.addr == address(this)) {
                revert IDiamond.CannotRemoveImmutableFunction(funct);
            }
            // replace funct with last funct
            --position;
            if (old.position != position) {
                bytes4 last = c.functs[position];
                c.functs[old.position] = last;
                c.facet[last].position = old.position;
            }
            // delete last funct
            c.functs.pop();
            delete c.facet[funct];
        }
    }

    function initializeDiamondCut(address _init, bytes memory _calldata) internal {
        if (_init == address(0)) {
            return;
        }
        enforceHasContractCode(_init, 'LibDiamondCut: _init address has no code');
        (bool success, bytes memory error) = _init.delegatecall(_calldata);
        if (!success) {
            if (error.length > 0) {
                // bubble up error
                /// @solidity memory-safe-assembly
                assembly {
                    let returndata_size := mload(error)
                    revert(add(32, error), returndata_size)
                }
            } else {
                revert IDiamond.InitializationFunctionReverted(_init, _calldata);
            }
        }
    }

    function enforceHasContractCode(address _contract, string memory _errorMessage) internal view {
        uint size;
        assembly {
            size := extcodesize(_contract)
        }
        if (size == 0) {
            revert IDiamond.NoBytecodeAtAddress(_contract, _errorMessage);
        }
    }
}
