import React,{useEffect} from 'react';
import { Link } from 'react-router-dom'
import SmhsLogo from "../images/Smhs_Logo.png";


function Hospital() {

  useEffect(()=>{
    localStorage.removeItem('token')

},[])


  return (
    <div className="App">
      <header className="App-header">
      <Link to="/">
      <img src={SmhsLogo} alt="Samvardhana Motherson" className="splash-logo" />
                </Link>
      </header>
    </div>
  );
}

export default Hospital;
