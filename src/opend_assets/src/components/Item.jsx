import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/nft";
import { Principal } from "@dfinity/principal";

function Item(props) {

// For displaying name of the NFT
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const id = Principal.fromText(props.id);

  //To fetch NFT from local device and agent with http
  const localHost = "http://localhost:8080/";
  const agent = new HttpAgent({host: localHost});

  async function loadNFT() {
    const NFTActor = await Actor.createActor(idlFactory, {
      agent,
      canisterId: id,
    });

    const name = await NFTActor.getName();
    const owner = await NFTActor.getOwner();
    
    //For extracting image from backend
    const imageData = await NFTActor.getAsset();
    const imageContent = new Uint8Array(imageData);
    const nftImage = URL.createObjectURL( new Blob([imageContent], {type: "image/png"}));

    setImage(nftImage);
    setName(name);
    setOwnerName(owner.toText());
  }

  useEffect(() => {
    loadNFT();
  }, []);

  return (
    <div className="disGrid-item">
      <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
        <img
          className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
          src={image}
        />
        <div className="disCardContent-root">
          <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
            {name}<span className="purple-text"></span>
          </h2>
          <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
            Owner: {ownerName}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Item;
