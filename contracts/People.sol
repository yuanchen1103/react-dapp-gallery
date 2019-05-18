pragma solidity ^0.5.0;
contract People {
  uint public id;
  string public name;
  uint[] ownedArts;
  
  constructor(uint _id, string memory _name) public payable {
      id =_id;
      name = _name;
  }
  function getArts() public view returns(uint[] memory) {
      return ownedArts;
  }
  function deleteArt(uint i) public payable {
      delete ownedArts[i];
  }
  function pushArt(uint i) public payable {
      ownedArts.push(i);
  }
}