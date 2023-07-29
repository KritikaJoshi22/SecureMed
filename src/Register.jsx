import React, { useState } from "react";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [mobno, setMobno] = useState('');
    const [username, setUsername] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

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
            <label htmlFor="username">Username</label>
            <input value={username} username="username" onChange={(e) => setUsername(e.target.value)} id="username" placeholder="username" />
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">Password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <label>Register As: <select name="Options">
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