import React, { Component } from 'react'
import {Redirect } from 'react-router-dom'
import  '../index.css';
import Navbar from './Navbar'

class Home extends Component {

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
      <div>
             <Navbar />
        <div className="container home">
          <h4 className="center">Home</h4>
         
         
        </div>
      </div>
    )
  }
}

export default Home