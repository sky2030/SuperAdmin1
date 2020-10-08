import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import SmhsLogo from "../images/Smhs_Logo.png";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let LoggedIn = true;
    if (token == null) {
      LoggedIn = false;
    }
    this.state = {
      username: "",
      password: "",
      token: "",
      LoggedIn,
    };
  }

  validate = () => {
    let usernameError = "";
    let passwordError = "";

    if (!this.state.username) {
      usernameError = "****User Name cannot be blank";
    }

    if (!this.state.password) {
      passwordError = "****password cannot be blank";
    }

    if (usernameError || passwordError) {
      this.setState({ usernameError, passwordError });
      return false;
    }

    return true;
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitForm = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const isValid = this.validate();
    if (isValid) {
      const payload = {
        username,
        password,
      };

      axios({
        url: "http://1d7db6c479b3.ngrok.io/v1/admin/login",
        method: "POST",
        data: payload,
      })
        .then((response) => {
          const data = response.data.data.token;
          // console.log(response.data.token)
          try {
            localStorage.setItem("token", data);
            this.setState({
              token: localStorage.getItem("token"),
            });
          } catch (e) {
            console.log("Something went wrong with sky's Code", e);
          }
        })
        .catch(() => {
          console.log("internal server error");
        });
    }

    // if (this.state.token === "") {
    //   return null;
    // } else {
    //   this.setState({
    //     LoggedIn: true,
    //   });
    // }
    // if(username ==="8882973229" && password ==="shiv"){
    //   localStorage.setItem("token", "aaaefdgadftaerd")
    //   this.setState({
    //     LoggedIn: true
    //   })
    // }
  };
  render() {
    if (this.state.token !== "") {
      return <Redirect to="/home" />;
    }
    return (
      <div className="App">
        <header className="App-header">
          <img
            src={SmhsLogo}
            alt="Samvardhana Motherson"
            className="App-logo"
          />
          <form onSubmit={this.submitForm} className="loginform">
            <div className="loginvalid">
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.usernameError}
              </div>
              <input
                type="text"
                placeholder="User Name"
                className="inputField"
                name="username"
                value={this.state.username}
                onChange={this.onChange}
              />{" "}
              <br />
            </div>
            <div className="loginvalid">
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.passwordError}
              </div>
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="inputField"
                value={this.state.password}
                onChange={this.onChange}
              />{" "}
              <br />
            </div>
            <input type="submit" className="button" /> <br />
          </form>
        </header>
      </div>
    );
  }
}

export default Login;
