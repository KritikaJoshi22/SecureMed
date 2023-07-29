import React, { useState } from "react";
import useInst from "./useinstance"
import { ethers } from "ethers";

const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [mobno, setMobno] = useState('');
    const [username, setUsername] = useState('');

   
    const contract = useInst();
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        var selectElement = document.getElementById('registrationOptions');

    // Get the selected value
        var selectedValue = selectElement.value;

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            // Get the connected signer (wallet)
            const signer = provider.getSigner();
        
            // Get the wallet address
            const address = await signer.getAddress();

            
        if(selectedValue === 'patient'){

            await contract.addPatient(address);
        }

        else if(selectedValue === 'patient'){

            await contract.addDoc(address);
        }
        
            console.log('Connected wallet address:', address);
            return address;
          } catch (error) {
            console.error('Error getting connected wallet address:', error);
            return null;
          }



    }

    // Get the select element
    

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full Name</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Full Name" />
            <label htmlFor="age">Age</label>
            <input value={age} age="age" onChange={(e) => setAge(e.target.value)} id="age" placeholder="age" />
            <label htmlFor="mobno">Mobile Number</label>
            <input value={mobno} mobno="mobno" onChange={(e) => setMobno(e.target.value)} id="mobno" placeholder="+91XXXXXXXXXX" />
            <input value={username} username="username" onChange={(e) => setUsername(e.target.value)} id="username" placeholder="0xXXXXXXXXXXXXXXXX" />
            <label>Register As: <select name="Options" id="registrationOptions">
        <option value="doctor">Doctor</option>
        <option value="patient">Patient</option>
      </select>
                </label>
                <br />
            <button type="submit">Submit Details</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>
    )
}

export default Register;