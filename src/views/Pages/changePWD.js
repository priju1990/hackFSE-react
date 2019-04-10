import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios'
import { BrowserRouter } from "react-router-dom";

import Loadable from 'react-loadable';
import { HashRouter, Route, Switch } from 'react-router-dom';
import  '../../scss/styles.css';
//import "./styles.css";
const isNumber = require('is-number');
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('../../containers/DefaultLayout'),
  loading
});


class ChangePWD extends React.Component {
  constructor(props) {
    super(props);
    this.state = {disable:true,
      oldPWD: "",
      password: "",
      newPassword:"",
      errorPassword: "",
      errorEmpID: "",
      EmpIDMsg: "",
      errorMsg:''
    };
    this.setOldPWD = this.setOldPWD.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.setConfirmPassword= this.setConfirmPassword.bind(this);
    this.validate = this.validate.bind(this);
  }
  setConfirmPassword(e){
      this.setState({newPassword:e.target.value})
      if(e.target.value=== this.state.password){
          this.setState({disable:false})
          this.setState({errorNewPassword:""})
          this.setState({errorPassword:""})
          this.setState({errorMsg:""})
      } else{
        this.setState({errorMsg:"Passwords do not match"})
        this.setState({disable:true})
        this.setState({errorNewPassword:"error"})
    }
  }
  setOldPWD(e) {
   
    this.setState({ oldPWD: e.target.value });
    if (e.target.value === ""){
        this.setState({errorOldPwd:"error"})
    }else{
        this.setState({errorOldPwd:""})
    }
  }
  setPassword(e) {
    this.setState({ password: e.target.value });
    if(e.target.value=== this.state.newPassword){
        this.setState({disable:false})
        this.setState({errorPassword:""})
        this.setState({errorNewPassword:""})
        this.setState({errorMsg:""})
    }
   
    else if(this.state.newPassword!==''&& (e.target.value!== this.state.newPassword)){
        this.setState({disable:true})
        this.setState({errorPassword:"error"})
        this.setState({errorMsg:"Passwords do not match"})
    }
    else{
        this.setState({disable:false})
        this.setState({errorPassword:""})
        this.setState({errorMsg:""})
        this.setState({errorNewPassword:""})
    }
   
  }
  validate() {
    if (
      this.state.oldPWD !== "" &&
      this.state.password !== ""&& this.state.newPassword!==""
      // need to add chk for 6 dig
    ) {
    
      this.setState({ errorOldPwd: "" });
      this.setState({ errorPassword: "" });
      this.setState({ errorNewPassword: "" });

        axios.post("http://172.18.2.50:9090/changePwd?empID="+sessionStorage.getItem("empID")+"&pwd="+this.state.oldPWD+"&newPwd="+this.state.newPassword)
        .then(response=>{
          
           
            this.props.history.push('/login')
           }
         
        
         )
        .catch((err)=>console.log(err))
      
    
     
    } else {
      if (this.state.oldPWD === "" ) {
      
        this.setState({ errorOldPwd: "error" });
      }
      if (this.state.password === "") {
        this.setState({ errorPassword: "error" });
      }
      if (this.state.newPassword === "") {
        this.setState({ errorNewPassword: "error" });
      }
      if (this.state.oldPWD !== "") {
        this.setState({ errorOldPwd: "" });
      }
      if (this.state.password !== "") {
        this.setState({ errorPassword: "" });
      }
      if (this.state.newPassword !== "") {
        this.setState({ errorNewPassword: "" });
      }
    }
  }

 
  render() {
    return (
      <div className="container">
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header">
              <h3>Change Password</h3>
              <div className="d-flex justify-content-end social_icon" />
            </div>
            <div className="card-body">
              <span style={{ color: "red" }}> {this.state.errorMsg}</span>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                  <i className="fas fa-key" />
                  </span>
                </div>
                <input
                id={this.state.errorOldPwd}
                  type="text"
                  className=  "form-control"
                   placeholder="Old password"
                  onChange={this.setOldPWD}
                />
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-key" />
                  </span>
                </div>
                <input
                id={this.state.errorPassword}
                  type="password"
                  placeholder="New password"
                  onChange={this.setPassword}
                  className= "form-control"
                />
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-key" />
                  </span>
                </div>
                <input
                id={this.state.errorNewPassword}
                  type="password"
                  placeholder="Re-enter new password"
                  onChange={this.setConfirmPassword}
                  className="form-control"
                />
              </div>
              <div className="row align-items-center remember" />
              <div className="form-group">
                <input
                disabled={this.state.disable}
                  type="submit"
                  onClick={this.validate}
                  value="Submit"
                  className="float-right loginbtn"
                />
              </div>
            </div>
           
          </div>
        </div>
       
      </div>
    );
  }
}
export default ChangePWD;
