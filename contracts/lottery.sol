// SPDX-License-Identifier: MIT
pragma solidity >0.4.4 <0.8.10;
pragma experimental ABIEncoderV2;

import "./SafeMath.sol";

contract Lottery {

  using SafeMath for uint256;

    address  public owner;
    address  [] public players;
    address [] public winners;
    address  public contrato;
    address public _winner;

    uint256 public valor = 0.001 ether;
    uint public precio ;

    mapping(address => string) knowName;
    mapping (address => uint) howMuchWin;

    constructor() {
        owner = msg.sender;
        contrato = address(this);
    }
    
    function valordeLaLoteria(uint _valor) public {
        valor = _valor;
    }

    function getContract()public view returns(address){
        return address(this);
    }

    function enter(uint _numTickets, string memory _name) public payable {
    require(msg.value >= _numTickets*(valor), "no tienes fondos suficientes");

    payable(msg.sender).transfer( _numTickets*(valor));
    precio = _numTickets*(valor);
    for(uint i = 0; i <_numTickets;i++){
    players.push(msg.sender);
    }
    knowName[msg.sender] = _name;
    }

    
    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }
    
    function pickWinner() public restricted {
        uint256 index = random() % players.length;
        _winner =  players[index];       
        winners.push(players[index]);
        players = new address [](0);
         _howMuchWin();

    }
    

    function getBalance() public view restricted returns(uint256) {
        return address(this).balance;
    }

    function getAmount() public view restricted returns(uint256) {
        uint _amount = address(this).balance;
        uint _amountModulo = _amount /100;
        uint _amountComision = _amountModulo.mul(70);
        return _amountComision;
    }

    function getString(address _address) public view returns(string memory){
        return knowName[_address];
    }    

    modifier restricted() {
        require(msg.sender == owner);
        _;
    }

    function _howMuchWin()  internal {
        howMuchWin[_winner] = getBalance();
    }

    function getHowMuch(address _address) public view returns (uint){
        return howMuchWin[_address];
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }
    function getWinners()public view returns (address[]memory){
        return winners;
    }

    function withdraw() public payable restricted {
        payable(owner).transfer(address(this).balance);
}

}
   