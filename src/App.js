import React from "react"; 
import './App.css'; 
import { BrowserRouter, Route, Routes} from "react-router-dom"; 
import Securemed from "./landingpage"; 
import Patient from "./patient"; 
import Doctor from "./Doctor"; 
// import Upload from "./Upload";
import Register from "./Register" ; 
function App() { 
 
  return ( 
    <BrowserRouter> 
    <Routes> 
      <Route path = "/" element = {<Securemed/>} /> 
      <Route path = "Patient" element = {<Patient/>} /> 
      <Route path = "Doctor" element = {<Doctor/>} /> 
      <Route path = "Register" element = {<Register/>} /> 
    </Routes> 
    </BrowserRouter> 
     
  ); 
} 
 
export default App;