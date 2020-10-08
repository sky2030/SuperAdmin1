import React, { Component } from "react";
import Navbar from "../Navbar";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./doctor.css";

class AllDoctors extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }

    this.state = {
      loggedIn,
      posts: [],
      hospitals: [],
      hospitalcode: "",
    };
  }
  // componentWillMount = () => {
  //   console.log(`this is hospital code ${this.state.hospitalcode}`);
  //   this.getDoctors();
  //   this.getHospital();
  // };

  // componentDidUpdate(prevState) {
  //   //Typical usage, don't forget to compare the props
  //   if (this.state.hospitalcode !== prevState.hospitalcode) {
  //     this.getDoctors(this.state.hospitalcode);
  //   }
  // }

  handleOnChange = (e) => {
    this.setState({
      hospitalcode: e.target.value,
    });
  };

  componentDidMount = () => {
    console.log(`this is hospital code ${this.state.hospitalcode}`);
    this.getDoctors();
    this.getHospital();
  };
  // componentWillUpdate = () => {
  //   this.getDoctors();
  // };
  getDoctors = () => {
    // console.log(`this is hospital code ${this.state.hospitalcode}`);
    let URL = `http://1d7db6c479b3.ngrok.io/v1/admin/doctors?hospitalcode=${this.state.hospitalcode}`;
    console.log(URL);
    axios
      .get(URL, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
        const data = response.data.data;
        this.setState({ posts: data });
        console.log("Data has been received!!");
      })
      .catch(() => {
        alert("Error retrieving data!!");
      });
  };

  getHospital = () => {
    axios
      .get("http://1d7db6c479b3.ngrok.io/v1/admin/hospitals/", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
        const data = response.data.data;
        this.setState({ hospitals: data });
        console.log("Data has been received!!");
      })
      .catch(() => {
        alert("Error retrieving data!!");
      });
  };

  render() {
    const { hospitals, posts } = this.state;
    const hospitallist = hospitals.length ? (
      hospitals.map((item) => {
        return (
          <option key={item._id} value={item.hospitalcode}>
            {item.hospitalname}
          </option>
        );
      })
    ) : (
      <div className="center">No Hospital</div>
    );

    const postList = posts.length ? (
      posts.map((post) => {
        return (
          <div key={post._id} className="DoctorCard">
            <div className="Docimage">
              <img alt="Doctor" src={post.picture} className="doctorAvt" />
            </div>
            <div className="Docinfo">
              <h4>
                {post.first_name} {post.last_name}
              </h4>
              <hr />
              <div>
                {" "}
                <p>{post.designation}</p>{" "}
              </div>
              <div>
                {" "}
                {post.degree} {post.department}{" "}
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <div className="center">No posts to show</div>
    );

    if (this.state.loggedIn === false) {
      return <Redirect to="/splash" />;
    }
    return (
      <div>
        <Navbar />
        <div className="Doccontainer">
          <select
            id="hospital"
            className="ChooseDoctor"
            onChange={this.handleOnChange}
          >
            {hospitallist}
          </select>

          {this.state.hospitalcode}
          <div className="Doctorcards"> {postList} </div>
        </div>
      </div>
    );
  }
}
export default AllDoctors;
