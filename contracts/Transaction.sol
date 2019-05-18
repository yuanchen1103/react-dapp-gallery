pragma solidity ^0.5.0;

contract Transaction {
  uint transactionId;
  uint artId;
  string artName;
  uint price;
  uint256 date;
  uint old_owner;
  uint new_owner;
  constructor(uint _transactionId, uint _artId, string memory _artName, uint _price, uint256 _date, uint _old_owner, uint _new_owner) public payable {
    transactionId = _transactionId;
    artId = _artId;
    artName = _artName;
    price = _price;
    date = _date;
    old_owner = _old_owner;
    new_owner = _new_owner;
  }
  

  function getTransactionInfo() public view returns(uint, uint, string memory, uint, uint256, uint, uint) {
    return (transactionId, artId, artName, price, date, old_owner, new_owner);
  }
}