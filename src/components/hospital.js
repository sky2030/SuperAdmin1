import React, { Component } from "react";
import Navbar from "./Navbar";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

class AllHospital extends Component {
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
    };
  }
  componentDidMount = () => {
    this.getHospital();
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
        this.setState({ posts: data });
        console.log("Data has been received!!");
      })
      .catch(() => {
        alert("Error retrieving data!!");
      });
  };

  render() {
    const { posts } = this.state;
    const postList = posts.length ? (
      posts.map((post) => {
        return (
          <div key={post._id}>
            <Link
              to={"/Hospitalinfo/" + post.hospitalcode}
              className="hospitalCard"
            >
              <div className="Hosimage">
                <img alt="Hospital" src={post.picture} className="myhospital" />
              </div>
              <div className="Hosinfo">
                <h4>
                  {post.hospitalname} {post.code}
                </h4>
                <hr />
                <div>
                  {" "}
                  <p>{post.place}</p>{" "}
                </div>
                <div>
                  {" "}
                  {post.landmark}, {post.district}{" "}
                </div>
                <div>
                  {post.state} {post.pincode}{" "}
                </div>
              </div>
            </Link>
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
        <div className="head-container">
          <h1>All Hospitals</h1>
          <Link to="/AddHospital" className="addhospitalbtn">
            Add Hospital
          </Link>
        </div>

        <div className="hoscontainer">
          <div className="Hospitalcards"> {postList} </div>
        </div>
        <div className="Footer"></div>
      </div>
    );
  }
}
export default AllHospital;
