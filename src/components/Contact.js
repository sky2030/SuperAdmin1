import React, { Component } from 'react'
import Rainbow from '../hoc/Rainbow'
import Navbar from './Navbar'
import { Redirect } from 'react-router-dom'
import phone from './Dashboard/images/phone.png'
import Email from './Dashboard/images/email.png'

class Contact extends Component {

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


  return (
     
      <div className='dashcontainer'>
          <Navbar />
            <div className='dashbody'>
                <div className="ContactCard"> 
                  <div className="contacthead"><h2 style={{color:"Darkred",marginBottom:'10px'}}>Get in touch to see how we can help you grow</h2></div>
                 <div className="contactbody">
                 <div  className="contacttext"> <img src={phone} alt="Phone Number" className="CardIcons"/>
                 <h4 >+120-5323435</h4> </div>
                           
                        <div className="contacttext" > <img src={Email} alt="Email Address" className="CardIcons"/>
                        <h4 >connect@smhs.motherson.com</h4> </div>
                           
                 </div>
                 <div><h4 style={{color:"Darkred",marginBottom:'10px',marginTop:'10px'}}>C-1, A & B, Sector-1, Noida-201301, Uttar Pradesh, India</h4></div>
                     
                </div>


            </div>  
        
      </div>
    
  )
}

}

export default Rainbow(Contact)