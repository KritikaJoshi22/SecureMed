// import React, { useEffect, useState } from "react";
// import detectEthereumProvider from "@metamask/detect-provider";
// import Web3 from "web3";

// export const Login = (props) => {
//   const [web3, setWeb3] = useState(null);

//   useEffect(() => {
//     // Detect if MetaMask is installed
//     async function getWeb3() {
//       const provider = await detectEthereumProvider();
//       if (provider) {
//         const web3Instance = new Web3(provider);
//         setWeb3(web3Instance);
//       } else {
//         alert("MetaMask not detected. Please install it to continue.");
//       }
//     }
//     getWeb3();
//   }, []);

//   // Function to handle wallet connection
//   // Function to handle wallet connection
//   const connectWallet = async () => {
//     if (web3) {
//       try {
//         // Request account access from the user
//         const accounts = await window.ethereum.request({
//           method: "eth_requestAccounts",
//         });
//         // accounts now contains an array of connected wallet addresses
//         const walletAddress = accounts[0];
//         console.log("Wallet Connected!");
//         console.log("Wallet Address:", walletAddress);
//         // You can now use the walletAddress for further processing, like user authentication or displaying the address on the UI.
//         // For example, you can save the walletAddress in state and use it to show the user's address on the UI.
//       } catch (error) {
//         console.error("Error connecting wallet:", error);
//       }
//     }
//   };

//   return (
//     <div>
//       <h1 className="Message">Welcome to SecureMed !</h1>
//       <div className="auth-form-container">
//         <h2>Login</h2>
//         <form className="login-form" onSubmit={connectWallet}>
//           <button type="submit">Connect Wallet</button>
//         </form>
//       </div>
//       <button
//         className="link-btn"
//         onClick={() => props.onFormSwitch("register")}
//       >
//         Do not have an account? Register here.
//       </button>
//     </div>
//   );
// };
