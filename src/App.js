import React, { useState } from "react";
import './App.css';
import { Login } from "./login";
import { Register } from "./registration";
import Securemed from "./landingpage";
import Patient from "./patient";
import Doctor from "./Doctor";
import Upload from "./Upload";
function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div> <Securemed/>
    <div className="App">
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      }
     </div> 
     <div><Patient/></div> 
     <div><Doctor/></div>
     <div><Upload/></div>
    </div>
    
  );
}

export default App;