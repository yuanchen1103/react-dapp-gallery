pragma solidity ^0.5.0;
// pragma experimental ABIEncoderV2;

import "./Transaction.sol";
// import "./Art.sol";
import "./People.sol";

contract Arts {
    
    uint[] arts;
    uint[] people;

    struct Art {
        uint artId;
        string artName;
        uint owner;
    }

    mapping(uint => Art) artInfo;
    mapping(uint => Transaction[]) transactionInfo;

    mapping(uint => uint) artOwner;

    mapping(uint => People) peopleInfo;

    constructor(uint[] memory _array, uint[] memory _p) public payable {
        arts = _array;
        people = _p;
    }

    function getArts() public view returns(uint[] memory) {
        uint[] memory temp = new uint[](arts.length);
        for (uint i = 0; i < arts.length; i++) {
            temp[i] = arts[i];
        }
        return temp;
    }
    // function getArtInfo(uint _artId) public view returns(uint, string memory, uint, Transaction[] memory) {
        function getArtInfo(uint _artId) public view returns(uint, string memory, uint) {
        // return (artInfo[_artId].artId, artInfo[_artId].artName, artInfo[_artId].owner, transactionInfo[_artId]);
        return (artInfo[_artId].artId, artInfo[_artId].artName, artInfo[_artId].owner);
    }
    function addPeople(uint _id, string memory _name) public payable {
        People p = new People(_id, _name);
        people.push(_id);
        peopleInfo[_id] = p;
    }
    function addArt(uint _artId, string memory name, uint owner) public payable {
        Art memory a = Art(_artId, name, owner);
        arts.push(_artId);
        artInfo[_artId] = a;
        artOwner[_artId] = owner;
    }

    function Time_call() public view returns (uint256){
        return now;
    }

    // function applyTransaction(uint _transactionId, uint oldOwner, uint newOwner, uint art, uint _price) public payable {
    //     require(oldOwner != newOwner);
    //     require(_price > 0);
    //     require(artInfo[art].owner() == oldOwner);
        
    //     for(uint i = 0; i < peopleInfo[oldOwner].getArts().length; i++){
    //       if(peopleInfo[oldOwner].getArts()[i] == artInfo[art].artId()) {
    //         peopleInfo[oldOwner].deleteArt(i);
    //       }
    //     }
    //     peopleInfo[newOwner].pushArt(art);
    //     Transaction t = new Transaction(_transactionId, artInfo[art].artId(), artInfo[art].artName(), _price, Time_call(), oldOwner, newOwner);
    //     artInfo[art].addHistory(t);
    //     artInfo[art].changeOwner(newOwner);
    //     transactionInfo[_transactionId] = t;
    // }
}