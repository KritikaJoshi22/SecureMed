import React, { PureComponent } from "react";
import "./Navbar.css";
import { Pinata } from "@pinata/sdk";
import Navbar from "./Navbar";

class Patient extends PureComponent {
  constructor() {
    super();
    this.fileInputRef = React.createRef();
    this.pinata = new Pinata({
      apiKey: process.env.REACT_APP_PINATA_API_KEY,
      apiSecret: process.env.REACT_APP_PINATA_API_SECRET,
    });
  }

  handleFileUpload = () => {
    // Trigger the file input element to open the file picker dialog
    this.fileInputRef.current.click();
  };

  handleFileSelected = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Upload the file to IPFS using the pinata library
      const ipfsUri = await this.pinata.pinFileToIPFS(file);
      console.log("IPFS URI:", ipfsUri);
    }
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="Firstpage">
          What would you like to do?
          <div>
            {/* Hidden file input element */}
            <input
              type="file"
              ref={this.fileInputRef}
              style={{ display: "none" }}
              onChange={this.handleFileSelected}
            />
            {/* Upload Documents button */}
            <button onClick={this.handleFileUpload}>
              Upload Documents
            </button>{" "}
            <button> View Documents </button>
            <br />
            <button> Access Management </button>{" "}
            <button> NFT Monetization </button>
            <br />
            <button> Get lifestyle recommendations </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Patient;
