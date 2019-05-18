pragma solidity ^0.5.0;
import "./Transaction.sol";

contract Art {
  string public artName;
  uint public artId;
  uint public owner;
  Transaction[] public history;
  constructor(uint _artId, string memory _artName, uint _owner) public payable {
    artId = _artId;
    artName = _artName;
    owner = _owner;
  }
  function getArtInfo() public view returns(uint, string memory, uint) {
    return (artId, artName, owner);
  }
  function getHistory() public view returns(Transaction[] memory) {
    return history;
  }
  function addHistory(Transaction t) public payable {
      history.push(t);
  }
  function changeOwner(uint o) public payable {
      owner = o;
  }
}