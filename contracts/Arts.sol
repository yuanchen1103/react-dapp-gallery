pragma solidity ^0.5.0;

contract Arts {
    
    uint[] arts;

    struct Art {
        uint artId;
        string artName;
        string owner;
        uint[] history;
    }
    struct Transaction {
        uint transactionId;
        uint artId;
        uint price;
        uint256 date;
        string old_owner;
        string new_owner;
    }

    mapping(uint => Art) artInfo;
    mapping(uint => Transaction) transactionInfo;

    constructor() public payable {
        arts = new uint[](0);
    }

    function getArts() public view returns(uint[] memory) {
        uint[] memory temp = new uint[](arts.length);
        for (uint i = 0; i < arts.length; i++) {
            temp[i] = arts[i];
        }
        return temp;
    }    
    function getArtInfo(uint _artId) public view returns(uint, string memory, string memory, uint[] memory) {
        uint[] memory temp = new uint[](artInfo[_artId].history.length);
        for (uint i = 0; i < artInfo[_artId].history.length; i++) {
            temp[i] = artInfo[_artId].history[i];
        }
        return (artInfo[_artId].artId, artInfo[_artId].artName, artInfo[_artId].owner, temp);
    }
    function addArt(uint _artId, string memory name, string memory owner) public payable {
        Art memory a = Art(_artId, name, owner, new uint[](0));
        arts.push(_artId);
        artInfo[_artId] = a;
    }
    function getTransactionInfo(uint _tId) public view returns(uint, uint, uint256, string memory, string memory) {
        return (transactionInfo[_tId].artId, transactionInfo[_tId].price, transactionInfo[_tId].date, transactionInfo[_tId].old_owner, transactionInfo[_tId].new_owner);
    }

    function Time_call() public view returns (uint256){
        return now;
    }

    function applyTransaction(uint _transactionId, string memory newOwner, uint art, uint _price) public payable {
        require(_price > 0);
        
        Transaction memory t = Transaction(_transactionId, art, _price, Time_call(), artInfo[art].owner, newOwner);
        artInfo[art].history.push(_transactionId);
        artInfo[art].owner = newOwner;
        transactionInfo[_transactionId] = t;
    }
}