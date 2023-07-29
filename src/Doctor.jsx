import React, { PureComponent } from 'react'
import SearchBar from "./searchBar";

export class Doctor extends PureComponent{
  render(){
    return (
      <div className = "SecondPage">
      <SearchBar/>
      List of Patients      Reports
      
      </div>
      
    )
  }
  
}


export default Doctor