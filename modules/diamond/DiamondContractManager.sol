// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.19;

/******************************************************************************\
* Author: Nick Mudge <nick@perfectabstractions.com>, Twitter/Github: @mudgen
* Modifier : Coinmeca Team <contact@coinmeca.net>
* Lightweight version of EIP-2535 Diamonds
\******************************************************************************/

import {IDiamond} from "./interfaces/IDiamond.sol";
import {IDiamondCut} from "./interfaces/IDiamondCut.sol";

library DiamondContractManager {
    using DiamondContractManager for DiamondContractManager.Data;

    struct Facet {
        address addr;
        bytes4[] functs;
    }

    struct Funct {
        address facet;
        uint16 position;
    }

    struct Data {
        address owner;
        address[] facets;
        mapping(address => Facet) facet;
        mapping(bytes4 => Funct) funct;
        mapping(bytes32 => mapping(bytes4 => bool)) interfaces;
        mapping(bytes32 => mapping(address => bool)) permission;
    }

    function contract_(
        bytes32 _contract
    ) internal pure returns (Data storage $) {
        assembly {
            $.slot := _contract
        }
    }

    /* Ownable */

    function setOwner(bytes32 _contract, address _owner) internal {
        enforceIsContractOwner(_contract);
        Data storage $ = contract_(_contract);
        emit OwnershipTransferred($.owner, _owner);
        $.owner = _owner;
    }

    function owner(bytes32 _contract) internal view returns (address _owner) {
        _owner = contract_(_contract).owner;
    }

    function enforceIsContractOwner(bytes32 _contract) internal view {
        Data storage $ = contract_(_contract);
        if ($.owner != address(0))
            if (msg.sender != $.owner) {
                revert IDiamond.NotContractOwner(msg.sender, $.owner);
            }
    }

    /* Permission */

    function setPermission(
        bytes32 _contract,
        address _owner,
        bool _permission
    ) internal {
        Data storage $ = contract_(_contract);
        $.checkPermission(_contract, msg.sender);
        $.permission[_contract][_owner] = _permission;
    }

    function checkPermission(
        Data storage $,
        bytes32 _contract,
        address _owner
    ) internal view returns (bool check) {
        check = _owner != $.owner && !$.permission[_contract][_owner];
        if (check) revert IDiamond.PermissionDenied(_owner);
        return check;
    }

    /* Loupe */

    function functs(
        bytes32 _contract,
        address _facet
    ) internal view returns (bytes4[] memory) {
        return contract_(_contract).facet[_facet].functs;
    }

    function facet(
        bytes32 _contract,
        bytes4 _funct
    ) internal view returns (address) {
        return contract_(_contract).funct[_funct].facet;
    }

    function facets(
        bytes32 _contract
    ) internal view returns (address[] memory) {
        return contract_(_contract).facets;
    }

    function getFacets(
        bytes32 _contract
    ) internal view returns (Facet[] memory facets_) {
        Data storage $ = contract_(_contract);
        uint length = $.facets.length;
        facets_ = new Facet[](length);
        for (uint256 i; i < length; i++) {
            address facet_ = $.facets[i];
            facets_[i] = Facet(facet_, $.facet[facet_].functs);
        }
    }

    function setInterface(
        bytes32 _contract,
        bytes4 _interface,
        bool _state
    ) internal {
        Data storage $ = contract_(_contract);
        $.checkPermission(_contract, msg.sender);
        $.interfaces[_contract][_interface] = _state;
    }

    function checkInterface(
        bytes32 _contract,
        bytes4 _interface
    ) internal view returns (bool) {
        return contract_(_contract).interfaces[_contract][_interface];
    }

    /* DiamondCut */

    event DiamondCut(
        IDiamondCut.FacetCut[] _diamondCut,
        address _init,
        bytes _calldata
    );

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    // Internal function version of diamondCut
    function diamondCut(
        bytes32 _contract,
        IDiamondCut.FacetCut[] memory _diamondCut,
        address _init,
        bytes memory _calldata
    ) internal {
        for (uint i; i < _diamondCut.length; ++i) {
            bytes4[] memory functs_ = _diamondCut[i].functionSelectors;
            address facet_ = _diamondCut[i].facetAddress;
            if (functs_.length == 0)
                revert IDiamond.NoSelectorsProvidedForFacetForCut(facet_);
            IDiamondCut.FacetCutAction action = _diamondCut[i].action;
            if (action == IDiamond.FacetCutAction.Add) {
                addFunctions(_contract, facet_, functs_);
            } else if (action == IDiamond.FacetCutAction.Replace) {
                replaceFunctions(_contract, facet_, functs_);
            } else if (action == IDiamond.FacetCutAction.Remove) {
                removeFunctions(_contract, facet_, functs_);
            } else {
                revert IDiamond.IncorrectFacetCutAction(uint8(action));
            }
        }
        emit DiamondCut(_diamondCut, _init, _calldata);
        initializeDiamondCut(_init, _calldata);
    }

    function addFunctions(
        bytes32 _contract,
        address _facet,
        bytes4[] memory _functs
    ) internal {
        if (_facet == address(0))
            revert IDiamond.CannotAddSelectorsToZeroAddress(_functs);
        enforceHasContractCode(_facet, "DiamondCut: Add facet has no code");
        Data storage $ = contract_(_contract);
        uint16 position = uint16($.facet[_facet].functs.length);
        for (uint i; i < _functs.length; ++i) {
            if ($.funct[_functs[i]].facet != address(0))
                revert IDiamond.CannotAddFunctionToDiamondThatAlreadyExists(
                    _functs[i]
                );
            $.facet[_facet].functs.push(_functs[i]);
            $.funct[_functs[i]] = Funct(_facet, position);
            ++position;
        }
        $.facets.push(_facet);
    }

    function replaceFunctions(
        bytes32 _contract,
        address _facet,
        bytes4[] memory _functs
    ) internal {
        Data storage $ = contract_(_contract);
        if (_facet == address(0))
            revert IDiamond.CannotReplaceFunctionsFromFacetWithZeroAddress(
                _functs
            );
        enforceHasContractCode(_facet, "DiamondCut: Replace facet has no code");
        for (uint i; i < _functs.length; ++i) {
            bytes4 funct_ = _functs[i];
            address facet_ = $.funct[funct_].facet;
            // can't replace immutable functions -- functions defined directly in the diamond in this case
            if (facet_ == address(this)) {
                revert IDiamond.CannotReplaceImmutableFunction(funct_);
            }
            if (facet_ == _facet) {
                revert IDiamond
                    .CannotReplaceFunctionWithTheSameFunctionFromTheSameFacet(
                        funct_
                    );
            }
            if (facet_ == address(0)) {
                revert IDiamond.CannotReplaceFunctionThatDoesNotExists(funct_);
            }
            // replace old facet address
            $.funct[funct_].facet = _facet;
        }
    }

    function removeFunctions(
        bytes32 _contract,
        address _facet,
        bytes4[] memory _functs
    ) internal {
        Data storage $ = contract_(_contract);
        uint position = $.facet[_facet].functs.length;
        if (_facet != address(0)) {
            revert IDiamond.RemoveFacetAddressMustBeZeroAddress(_facet);
        }
        for (uint i; i < _functs.length; ++i) {
            bytes4 funct_ = _functs[i];
            Funct memory old = $.funct[funct_];
            if (old.facet == address(0)) {
                revert IDiamond.CannotRemoveFunctionThatDoesNotExist(funct_);
            }

            // can't remove immutable functions -- functions defined directly in the diamond
            if (old.facet == address(this)) {
                revert IDiamond.CannotRemoveImmutableFunction(funct_);
            }
            // replace funct with last funct
            position--;
            if (old.position != position) {
                bytes4 last = $.facet[_facet].functs[position];
                $.facet[_facet].functs[old.position] = last;
                $.funct[last].position = old.position;
            }
            // delete last funct
            $.facet[_facet].functs.pop();
            delete $.funct[funct_];
        }
    }

    function initializeDiamondCut(
        address _init,
        bytes memory _calldata
    ) internal {
        if (_init == address(0)) {
            return;
        }
        enforceHasContractCode(_init, "DiamondCut: _init address has no code");
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
                revert IDiamond.InitializationFunctionReverted(
                    _init,
                    _calldata
                );
            }
        }
    }

    function enforceHasContractCode(
        address _contract,
        string memory _errorMessage
    ) internal view {
        uint size;
        assembly {
            size := extcodesize(_contract)
        }
        if (size == 0) {
            revert IDiamond.NoBytecodeAtAddress(_contract, _errorMessage);
        }
    }
}
