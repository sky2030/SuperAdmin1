import React, { Component } from "react";
import Navbar from "../Navbar";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import "./detail.css";

class HospitalDetail extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      loggedIn,
      hospitals: {},
    };
  }
  componentDidMount = () => {
    console.log(`This is Hospital ID ${this.props.match.params.id}`);
    this.getHospital();
    //  this.setState({hospital: this.props.match.params});
    //  console.log(`This is Hospital Name ${this.props.match.params.hospitalname}`)
  };

  getHospital = () => {
    //  axios.get('/v1/admin/hospitals/'+`?hospitalcode=${this.props.match.params.id}&doctorName=Sanjeev`,
    axios
      .get(
        "http://1d7db6c479b3.ngrok.io/v1/admin/hospitals/" +
          this.props.match.params.id,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      // axios.get('http://localhost:4300/saket_Hospital')
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
    const { hospitals } = this.state;

    if (this.state.loggedIn === false) {
      return <Redirect to="/splash" />;
    }

    return (
      <div>
        <Navbar />
        <div className="head-hospitaldetail">
          <Link to="/hospital" className="backbtn">
            Back
          </Link>
        </div>

        <div className="hosdetailcontainer">
          <div key={hospitals.code} className="hospitalDetailCard">
            <div className="Hosdetailpicture">
              <img
                alt="Hospital"
                src={hospitals.picture}
                className="hospitaldetail"
              />
            </div>
            <div className="Hosinfodetail">
              <h2>
                {hospitals.hospitalname} {hospitals.code}
              </h2>
              <hr />
              <h4> Email Address : {hospitals.email} </h4>
              <h4>Phone No. {hospitals.phone}</h4>
              <h4>Emergency No. {hospitals.EmergencyNo}</h4>
              <hr />
              <div>
                {" "}
                <p>{hospitals.place}</p>{" "}
              </div>
              <div>
                {" "}
                {hospitals.Landmark} {hospitals.District}{" "}
              </div>
              <div>
                {" "}
                <h4>{hospitals.state} </h4>
                {hospitals.pincode}{" "}
              </div>
            </div>
          </div>

          <div className="Footer"></div>
        </div>
      </div>
    );
  }
}
export default HospitalDetail;
