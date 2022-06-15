// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;
contract Auction
{
    address payable public beneficiary;
    uint public auctionEndtime;
    address public highestBidder;
    uint public highestBid;
    uint temp;
     mapping(address => uint) public pendingReturns;
     bool ended = false;

     event HighestBidIncrease(address bidder,uint amount);
     event AuctionEnded(address winner, uint amount);

     constructor (uint _biddingTime , address payable _beneficiary)
     {
         beneficiary = _beneficiary;
         auctionEndtime=block.timestamp+_biddingTime;
     }
     function bid() public payable{
         if(block.timestamp > auctionEndtime)
         {
             revert("auction ended");
         }
         //to make a minimum highest bid greater than 1 percet of current bid
        temp= highestBid+highestBid*1/100;
         if(msg.value <= temp)
         {
             revert ("place a high bid");
         }
         if(highestBid!=0)
         {
             pendingReturns[highestBidder] +=highestBid;
         }
         highestBidder=msg.sender;
         highestBid=msg.value;
         emit HighestBidIncrease(msg.sender,msg.value);
     }
     function withdraw() public returns(bool)
     {
         uint amount=pendingReturns[msg.sender];
         if(amount>0)
         {
             pendingReturns[msg.sender]=0;
             if(!payable(msg.sender).send(amount))
             {
                 pendingReturns[msg.sender]=amount;
                 return false;
             }
         }
         return true;
     }

     function auctionEnd() public 
     {
         if(block.timestamp<auctionEndtime)
         {
             revert("Auction has not ended yet");
         }
         if ( ended)
         {
             revert("auctionEnd has already been called");
         }
         ended = true;
         beneficiary.transfer(highestBid);
     }
}
