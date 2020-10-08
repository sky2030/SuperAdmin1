import React, { Component } from "react";
//import ReactDOM from 'react-dom';
//import './doctorscreens.css'
import axios from "axios";
import Navbar from "../Navbar";
import "./patient.css";

class AllPatient extends Component {
  constructor(props) {
    super(props);
    //const token = localStorage.getItem("token")

    this.state = {
      posts: [],
      hospitals: [],
      hospitalcode: "",
    };
  }
  componentDidMount = () => {
    this.GetPatients();
    this.getHospital();
  };

  handleOnChange = (e) => {
    this.setState({
      hospitalcode: e.target.value,
    });
  };

  GetPatients = () => {
    axios
      .get("http://1d7db6c479b3.ngrok.io/v1/admin/patients/", {
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
          <div key={post._id} className="patientCard">
            <div className="patientheader">
              <div className="invoiceheader">
                <h4 className="invoicediv">Mobile No- {post.mobile}</h4>
              </div>
              <div className="textheader">
                <div className="bodyheadernew">
                  <div className="bodytext">
                    <p className="textalign">Patient Name</p>
                    <p className="textalign1">{post.patient_name}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <div className="center">No posts to show</div>
    );

    return (
      <div>
        <Navbar />
        <div className="image1">
          <select
            id="hospital"
            className="ChoosePatient"
            onChange={this.handleOnChange}
          >
            {hospitallist}
          </select>
          {/* {this.state.hospitalcode} */}
          <div className="patientcontainer">{postList}</div>
        </div>
      </div>
    );
  }
}
export default AllPatient;
