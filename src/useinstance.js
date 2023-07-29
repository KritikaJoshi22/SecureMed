import {useState, useEffect} from "react";
import test_abi from "./recordsabi.json";
import { ethers } from "ethers";


 const useInst = () => {

    const [contract, setContract] = useState(null);

    const contractAddress = "0xb8697EF852F18265D64BF0A8a950967D855f7f42";
    const evenTesABI = test_abi.abi;

    useEffect(() => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      console.log(provider);

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

      setContract(evenTesContract);


      console.log("Contract instance:",evenTesContract);
    } catch (error) {
      console.error("Error creating contract instance:", error);
    }
    
}, []);

return contract;

  };

  export default useInst;