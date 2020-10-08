import React, { Component } from 'react';
import './App.css'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
//import Home from './components/Home'
import Dashboard from './components/Dashboard/Dashboard'
import hospital from './components/hospital'
import Contact from './components/Contact'
import Login from './components/Login'
import Hospital from './components/Splash'
//import SignUp from './components/Signup';
//import SignIn from './components/Signin';
import AddHospital from './components/AddHospital/hospitalform'
import AllDoctors from './components/Doctors/Doctor';
import AllPatient from './components/Patients/patient';
import HospitalDetail from './components/HospitalDetail/HospitalDetail'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">

          <Switch>
          <Route path='/splash' component={Hospital} /> 
            <Route exact path='/' component={Login}/>            
            <Route path='/home' component={Dashboard} />
            <Route path='/hospital' component={hospital} />
            <Route path='/doctors' component={AllDoctors} />
            <Route path='/patient' component={AllPatient} />
            <Route path='/contact' component={Contact} />
            <Route path='/Hospitalinfo/:id' component={HospitalDetail} />
            <Route path='/AddHospital' component={AddHospital} />
            
          </Switch>
          
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
