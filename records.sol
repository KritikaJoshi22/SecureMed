// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts@4.9.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.9.2/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts@4.9.2/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@4.9.2/utils/Counters.sol";

contract MakeNFT is ERC721, ERC721Enumerable, ERC721URIStorage
{
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("SecureMedRecord", "SMR") {}

    function safeMint(address to, string memory uri) public
    {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) 
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function checkTransfer(address recipient, uint256 tokenId) public view returns (bool) 
    {
        address owner = ownerOf(tokenId);
        return (owner == recipient);
    }
}

contract Documents
{
    /*Hash values of the records stored on the IPFS
    server are mapped to the address of every patient*/
    mapping(address => bytes32[]) documents;

    function addDocument(bytes32 documentHash, address patient) public 
    returns (uint256)
    {
        //push returns the array length
        documents[patient].push(documentHash);
        return documents[patient].length - 1;
    }

    function getDocuments(address patient) public view
    returns (bytes32[] memory)
    {
        return documents[patient];
    }

}

contract DoctorAccesses
{
    //mapping: Doctor's Address => Pateints' Addresses 
    //doctorePermissions = {Doc1: [Patient1, Patient2, ..], Doc2: [Patient1, Patient2, ..], ..}
    mapping(address => address[]) doctorPermissions;

    mapping (address => bool) doctors;  // mapping to add doctors

    mapping (address => bool) patients;   // mapping to add and keep track of patients

    function addDoc(address addr) public    // function that lets you add a user as doc, when he/she comes for the 
    {                                       // first time on the page
        doctors[addr] = true;
    }

    function addPatient(address addr) public  // function that lets you add a user as patient, when he/she comes for the 
    {                                         // first time on the page
        patients[addr] = true;
    }


    /*Patient grants access to a doctor. 
    The patient's address is mapped to the doctor's*/
    function grantAccess(address doctor) public  
    {
        doctorPermissions[doctor].push(msg.sender);
    }

    function revokeAccess(address doctor) public
    {
        for(uint i = 0; i < doctorPermissions[doctor].length; i++)
        {
            if(doctorPermissions[doctor][i] == msg.sender)
            {
                delete doctorPermissions[doctor][i];
                break ;
            }
        }
    }

    function patientsUnderDoctor(address doctor) public view 
    returns (address[] memory)
    {
        return doctorPermissions[doctor];
    }

}

/*
Multiple Inheritance:
PatientFunctions inherits from RecordsChain, DoctorAccesses
*/
contract PatientFunctions is Documents, DoctorAccesses, MakeNFT
{
    address patient = msg.sender;

    function manageAccess(address doctor) external {
        _grantAccess(doctor);
        _revokeAccess(doctor);
    }

    // Internal wrapper functions to access the internal functions from DoctorAccesses

    function _grantAccess(address doctor) internal {
        grantAccess(doctor);
    }

    function _revokeAccess(address doctor) internal {
        revokeAccess(doctor);
    }


    // Checks whether the doc is already in the mapping or not 
    function checkDoc() public view returns(bool)
    {
        if(doctors[msg.sender])
        return true;

        return false;
    }

    // Checks whether the patiebt is already added ot not and returns a boolean value
    function checkPatient() public view returns(bool)
    {
        if(patients[msg.sender])
        return true;

        return false;
    }
}

//DoctorFunctions inherits from DoctorAccesses to access the patientsUnderDoctor function 
contract DoctorFunctions is Documents, DoctorAccesses
{
    address doctor = msg.sender;

    function viewPatients(address doc) external view
    {
        patientsUnderDoctor(doc);
    }

}
