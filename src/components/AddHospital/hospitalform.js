import React from "react";
import axios from "axios";
import Navbar from "../Navbar";
import { Redirect } from "react-router-dom";
import "./add.css";

const initialState = {
  hospitalname: "",
  hospitalcode: "",
  email: "",
  phone: "",
  password: "",
  picture: "",
  place: "",
  Landmark: "",
  District: "",
  city: "",
  state: "",
  pincode: "",
  nameError: "",
  emailError: "",
  phoneError: "",
  selectedFile: null,
  submitted: false,
};

class MyForm extends React.Component {
  state = initialState;

  validate = () => {
    let nameError = "";
    let emailError = "";
    let phoneError = "";

    if (!this.state.hospitalname) {
      nameError = "****Hospital name cannot be blank";
    }

    if (!this.state.email.includes("@")) {
      emailError = "****Invalid Email";
    }
    if (!this.state.phone) {
      phoneError = "****Phone number cannot be blank";
    }

    if (emailError || nameError || phoneError) {
      this.setState({ emailError, nameError, phoneError });
      return false;
    }

    return true;
  };

  // submitData = (event)=>{
  //   event.preventDefault();
  //   fetch("/insert_Hospital",{
  //       method:"post",
  //       headers:{
  //         'Content-Type': 'application/json'
  //       },
  //       body:JSON.stringify({
  //         hospitalname:this.state.hospitalname,
  //         code:this.state.code,
  //         email:this.state.email,
  //         phone:this.state.phone,
  //         picture:this.state.picture,
  //         place:this.state.place,
  //         Landmark:this.state.Landmark,
  //         District:this.state.District,
  //         city:this.state.city,
  //         state:this.state.state,
  //         pincode:this.state.pincode,
  //       })
  //   })
  //   .then(res=>res.json())
  //   .then(data=>{
  //       console.log(`${this.state.hospitalname} is saved successfully`)
  //       this.resetUserInputs();
  //   })
  //   .catch(err=>{
  //     console.log(`${err} Something Went Wrong`)
  // })
  // }

  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      const payload = {
        hospitalname: this.state.hospitalname,
        //  hospitalcode: this.state.hospitalcode,
        email: this.state.email,
        phone: this.state.phone,
        password: this.state.password,
        picture: this.state.picture,
        place: this.state.place,
        landmark: this.state.Landmark,
        district: this.state.District,
        city: this.state.city,
        state: this.state.state,
        pincode: this.state.pincode,
      };
      axios({
        url: "http://1d7db6c479b3.ngrok.io/v1/admin/hospitals/add",
        method: "POST",
        data: payload,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
        .then(() => {
          console.log("Data has been sent to the server successfully");
          console.log(this.state.picture);
          this.resetUserInputs();
          this.setState({
            submitted: true,
          });
        })
        .catch(() => {
          console.log("internal server error");
        });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  // onChangeHandler = (event) => {
  //   this.setState({
  //     selectedFile: event.target.files[0],
  //     loaded: 0,
  //   });
  // };
  onChangeHandler = (event) => {
    console.log("file to upload:", event.target.files[0]);

    this.getBase64(event.target.files[0], (result) => {
      this.setState({
        picture: result,
      });
      console.log(result);
    });

    // let file = event.target.files[0];

    // if (file) {
    //   const reader = new FileReader();

    //   reader.onload = this._handleReaderLoaded.bind(this);
    //   reader.readAsBinaryString(file);
    // }
  };

  getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  //   this.getBase64(idCard, (result) => {
  //      idCardBase64 = result;
  // });

  _handleReaderLoaded = (readerEvt) => {
    let binaryString = readerEvt.target.result;
    this.setState({
      picture: btoa(binaryString),
    });
  };

  handleUpload = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    data.append("upload_preset", "skyMedi");
    data.append("cloud_name", "skycloud55");

    fetch("https://api.cloudinary.com/v1_1/skycloud55/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.url);
        this.setState({
          picture: data.url,
        });
        console.log(this.state.picture);
      })
      .catch((err) => {
        console.log("error while uploading" + err);
      });
  };

  resetUserInputs = () => {
    this.setState(initialState);
  };

  render() {
    if (this.state.submitted) {
      return <Redirect to="/hospital" />;
    }

    return (
      <div>
        <Navbar />
        <div className="formbody">
          <h1 style={{ color: "white" }}>Add Hospital </h1>
          <form onSubmit={this.handleSubmit}>
            <div className="cardhead">
              <div className="formInput">
                <p className="textinput">Hospital Name</p>
                <div className="validinput">
                  <input
                    type="text"
                    className="inputbox"
                    value={this.state.hospitalname}
                    name="hospitalname"
                    placeholder="Hospital Name"
                    onChange={this.handleChange}
                  />
                  <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.nameError}
                  </div>
                </div>
              </div>

              {/* <div className='formInput' >
        <p className='textinput'>Code</p>
        <input
          type="text" className='inputbox'
          value={this.state.hospitalcode}
          name="hospitalcode"
     
          placeholder="Unique Code"
          onChange={this.handleChange}
        /></div> */}

              <div className="formInput">
                <p className="textinput">Email Address</p>
                <div className="validinput">
                  <input
                    type="text"
                    className="inputbox"
                    value={this.state.email}
                    name="email"
                    required="true"
                    placeholder="Email Address"
                    onChange={this.handleChange}
                  />{" "}
                  <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.emailError}
                  </div>
                </div>
              </div>

              <div className="formInput">
                <p className="textinput">Phone No</p>
                <div className="validinput">
                  <input
                    type="number"
                    className="inputbox"
                    value={this.state.phone}
                    name="phone"
                    placeholder="ex- 12043****"
                    onChange={this.handleChange}
                  />
                  <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.phoneError}
                  </div>
                </div>
              </div>

              <div className="formInput">
                <p className="textinput">Password</p>
                <input
                  type="password"
                  className="inputbox"
                  value={this.state.password}
                  name="password"
                  placeholder="hospital login password"
                  onChange={this.handleChange}
                />
              </div>

              <div className="formInput">
                <p className="textinput">Address</p>
                <input
                  type="text"
                  className="inputbox"
                  value={this.state.place}
                  name="place"
                  placeholder="ex- 1B, Madan Complex"
                  onChange={this.handleChange}
                />
              </div>

              <div className="formInput">
                <p className="textinput">Landmark</p>
                <input
                  type="text"
                  className="inputbox"
                  value={this.state.Landmark}
                  name="Landmark"
                  placeholder="ex- Nearby "
                  onChange={this.handleChange}
                />
              </div>

              <div className="formInput">
                <p className="textinput">City/Town</p>
                <input
                  type="text"
                  className="inputbox"
                  value={this.state.city}
                  name="city"
                  placeholder="ex-New Delhi"
                  onChange={this.handleChange}
                />
              </div>
              <div className="formInput">
                <p className="textinput">District</p>
                <input
                  type="text"
                  className="inputbox"
                  value={this.state.District}
                  name="District"
                  placeholder="ex- South "
                  onChange={this.handleChange}
                />
              </div>

              <div className="formInput">
                <p className="textinput">State</p>
                <input
                  type="text"
                  className="inputbox"
                  value={this.state.state}
                  name="state"
                  placeholder="Enter a State"
                  onChange={this.handleChange}
                />
              </div>

              <div className="formInput">
                <p className="textinput">Zip/Pin Code</p>
                <input
                  type="number"
                  className="inputbox"
                  value={this.state.pincode}
                  name="pincode"
                  placeholder="Enter a pincode"
                  onChange={this.handleChange}
                />
              </div>
              <div className="uploadsection">
                <p className="textinput">Upload Image</p>
                <input
                  type="file"
                  className="uploadbox"
                  name="file"
                  accept=".jpeg, .png, .jpg"
                  onChange={this.onChangeHandler}
                />
              </div>
              <div className="uploadbtn">
                <button className="uploadimage" onClick={this.handleUpload}>
                  Upload
                </button>
              </div>
            </div>
            <div className="buttonhead">
              <button className="buttonNew" type="submit">
                Submit
              </button>

              <button className="cancelNew" onClick={this.resetUserInputs}>
                Reset
              </button>
            </div>
          </form>
          <div className="Footer">
            <img
              alt="Hospital"
              src={this.state.picture}
              className="hospitalformimage"
            />
          </div>
        </div>
      </div>
    );
  }
}
export default MyForm;
