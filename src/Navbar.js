import React from 'react';
function Navbar() {
  return (
    <div classname="Navbar">
    <div classname ="Navbar-logo">
        Securemed</div>
    <ul classname="Navbar-menu">
        <li><a href ='./landingpage'>HOME</a></li>
        <li><a href ='./login'>Logout</a></li>
    </ul>
    
    </div>
  )
}

export default Navbar;