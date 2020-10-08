import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
import './Dashboard.css'
import { Link,Redirect } from 'react-router-dom'
import logo from './images/hospital.png'
import logo1 from './images/docIcon.png'
import logo2 from './images/patient.png'
import logo3 from './images/phone.png'
import Navbar from '../Navbar'


class admindashboard extends Component {

    constructor(props){
        super(props)
        const token = localStorage.getItem("token")
    
        let loggedIn = true
        if (token == null){
          loggedIn = false
        }
        this.state = {
          loggedIn
        }
      }

    
    render(){
        if(this.state.loggedIn === false){
            return <Redirect to="/splash"/>
        }
        return(
            <div className='dashcontainer'>
                 <Navbar />
            <div className='dashbody'>

            <Link to = '/hospital' className="dashboardCard">
            <div className="hosimages" > <img src={logo} alt="Hospital" className="CardIcons"/></div>
            <div className="HosAddress1">
             <h4>My Hospital</h4>
             </div>          
             </Link>
            
             <Link to = '/doctors' className="dashboardCard">
            <div className="hosimages" > <img src={logo1} alt="Hospital" className="CardIcons"/></div>
            <div className="HosAddress1">
             <h4>Doctors</h4>
             </div>            
             </Link>

             
            <Link to = '/patient'  className="dashboardCard">
            <div className="hosimages" > <img src={logo2} alt="Hospital" className="CardIcons"/></div>
            <div className="HosAddress1">
             <h4 >Patient</h4>
             </div>            
             </Link>

             <Link to = '/contact'  className="dashboardCard">
            <div className="hosimages" > <img src={logo3} alt="Hospital" className="CardIcons"/></div>
            <div className="HosAddress1">
             <h4>Service</h4>
             </div>            
             </Link>
             </div>
             </div>

             
        
        );
    }
}

export default admindashboard;