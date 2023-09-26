import Principal "mo:base/Principal";
import ExperimentalCycles "mo:base/ExperimentalCycles";
import NFTActorClass "../NFT/nft";
import Cycles "mo:base/ExperimentalCycles";
import Debug "mo:base/Debug";

actor OpenD {

//For Minter.jsx 
 public shared(msg) func mint(imgData: [Nat8], name: Text) : async Principal {
    let owner : Principal = msg.caller;//Passes principal id of owner

   Debug.print(debug_show (Cycles.balance()));
    Cycles.add(100_500_000_000);

    let newNFT = await NFTActorClass.NFT(name, owner, imgData);
    Debug.print(debug_show (Cycles.balance()));

    let newNFTPrincipal = await newNFT.getCanisterId();

    return newNFTPrincipal;
 };

};
