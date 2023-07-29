"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import test_abi from "./recordsabi.json";
import { useNavigate } from "react-router-dom";

export default function Home() {
  
  const navigation = useNavigate()

  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [evenTes, setevenTes] = useState(undefined);
  const [isPatient, setIsPatient] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);

  const contractAddress = "0xb8697EF852F18265D64BF0A8a950967D855f7f42";
  const evenTesABI = test_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    getevenTesContract();
  };

  const getevenTesContract = () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const evenTesContract = new ethers.Contract(
        contractAddress,
        evenTesABI,
        signer
      );

      if (!evenTesContract) {
        throw new Error("Failed to create contract instance.");
      }

      console.log("Contract instance created:", evenTesContract);

      setevenTes(evenTesContract);

      // localstorage.setItem('contractInstance', JSON.stringify(evenTesContract));

      console.log("Contract instance:", evenTes);
    } catch (error) {
      console.error("Error creating contract instance:", error);
    }
  };

  const getPatient = async () => {
    if (!evenTes) {
      // Wait for evenTes to be initialized
      await getevenTesContract();
      console.log("trying patient");
    }

    if (evenTes) {
      console.log("found patient");
      const check = await evenTes.checkPatient();
      console.log(check);
      console.log("check2");
      setIsPatient(check);
    }
  };

  const getDoc = async () => {
    if (!evenTes) {
      // Wait for evenTes to be initialized
      await getevenTesContract();
      console.log("trying dox");
    }

    if (evenTes) {
      const check = await evenTes.checkDoc();
      setIsDoctor(check);
      console.log("found doc");
    }
  };

  const handleNavigate = () => {
    if (evenTes){
    if (isPatient) {
      navigation("/patient");
    }
    if (isDoctor) {
      navigation("/doctor");
    } else {
      navigation("/register");
    }
  }
  else{
    return <div>Contract not instance</div>
  }
  };

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this evenTes.</p>;
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return (
        <button onClick={connectAccount}>
          Please connect your Metamask wallet
        </button>
      );
    }

    getPatient();
    getDoc();
    handleNavigate();
  };
  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <div className="Firstpage">
        <h2>Welcome To Securemed!</h2>
        <br />
        <h3 className="Description">
          A Blockchain-Enabled Medical Records Manager with AI-Powered Insights
          and NFT Monetization
        </h3>
      </div>

      {initUser()}
    </main>
  );
}
