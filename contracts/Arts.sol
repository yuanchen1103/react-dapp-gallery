pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Arts {
    
    string[] arts;

    struct Art {
        string artId;
        string artName;
        string owner;
        string history;
    }
    struct Transaction {
        string transactionId;
        string artId;
        uint price;
        uint256 date;
        string old_owner;
        string new_owner;
    }

    mapping(string => Art) artInfo;
    mapping(string => Transaction) transactionInfo;

    constructor() public payable {
        arts = new string[](0);
    }

    function getArts() public view returns(string[] memory) {
        string[] memory temp = new string[](arts.length);
        for (uint i = 0; i < arts.length; i++) {
            temp[i] = arts[i];
        }
        return temp;
    }    
    function getArtInfo(string memory _artId) public view returns(string memory, string memory, string memory, string memory) {
        return (artInfo[_artId].artId, artInfo[_artId].artName, artInfo[_artId].owner, artInfo[_artId].history);
    }
    function addArt(string memory _artId, string memory name, string memory owner) public payable {
        Art memory a = Art(_artId, name, owner, "");
        arts.push(_artId);
        artInfo[_artId] = a;
    }
    function getTransactionInfo(string memory _tId) public view returns(string memory, uint, uint256, string memory, string memory) {
        return (transactionInfo[_tId].artId, transactionInfo[_tId].price, transactionInfo[_tId].date, transactionInfo[_tId].old_owner, transactionInfo[_tId].new_owner);
    }

    function Time_call() public view returns (uint256){
        return now;
    }

    function applyTransaction(string memory _transactionId, string memory newOwner, string memory art, uint _price) public payable {
        require(_price > 0);
        
        Transaction memory t = Transaction(_transactionId, art, _price, Time_call(), artInfo[art].owner, newOwner);
        artInfo[art].history = string(abi.encodePacked(artInfo[art].history,_transactionId,","));
        artInfo[art].owner = newOwner;
        transactionInfo[_transactionId] = t;
    }
}