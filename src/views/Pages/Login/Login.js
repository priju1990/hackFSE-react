import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios'
import { BrowserRouter } from "react-router-dom";
import qs from 'qs';
import Loadable from 'react-loadable';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Feedback from '../../Admin/viewFeedback'

import  '../../../scss/styles.css';

const isNumber = require('is-number');
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('../../../containers/DefaultLayout'),
  loading
});





class Login extends React.Component {
  constructor(props) {
    super(props);
       this.state = {
      err:'',
      sysErr:'',
      empID: "",
      password: "",
      errorPassword: "",
      errorEmpID: "",
      EmpIDMsg: ""
    };
    this.setEmpID = this.setEmpID.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.validate = this.validate.bind(this);
  }
  
  setEmpID(e) {
   
    this.setState({err:'',sysErr:'',errorPassword:'',errorEmpID:'',EmpIDMsg:''})
    this.setState({ empID: e.target.value });
  }
  setPassword(e) {
    this.setState({err:'',sysErr:'',errorPassword:'',errorEmpID:'',EmpIDMsg:''})
    this.setState({ password: e.target.value });
    console.log(this.state.password);
  }
  validate() {
    if (
      this.state.empID !== "" &&
      this.state.password !== "" &&
      isNumber(this.state.empID) // need to add chk for 6 dig
    ) {
    
      this.setState({ errorEmpID: "" });
      this.setState({ errorPassword: "" });
     var head= { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'accept':'*/*' };
      
      var data= qs.stringify({
        
                 username : this.state.empID ,password: this.state.password
        
               })
        axios.post("http://172.18.2.50:9090/login",data,{withCredentials: true,crossdomain : true})
        .then(response=>{
          if(null!= sessionStorage.getItem("loggedIn"))
          {
            sessionStorage.removeItem("loggedIn")
          }
          var expires = new Date().getMinutes()+10;
          var sessionObject = {
              expiresAt: expires,
             
          }
          sessionStorage.setItem("loggedIn", JSON.stringify(sessionObject));
          // ReactDOM.render( <App />, document.getElementById('home'));;
        
   
          if(response.data.Role!==''){
            sessionStorage.setItem('role', response.data.Role)
            sessionStorage.setItem('empID',this.state.empID);
            if(response.data.Role==="Admin")
           {      console.log(response.data.Role)
             this.props.history.push('/dashboard')
          }
          else if(response.data.Role==='POC'||response.data.Role==='PMO'){
            this.props.history.push('/viewFeedback')
          }
          else{
            this.setState({err:"Incorrect username/password"})
          }
          }

        else{
            this.setState({err:"Incorrect username/password"})
          }
         
        }
         )
        .catch((err)=>{this.setState({sysErr:"Could not login. Try again later"})})
      
    
     
    } else {
      if (this.state.empID === "" || this.state.empID.isNan ) {
        this.setState({ EmpIDMsg: "Enter 6 digit EnpID" });
        this.setState({ errorEmpID: "error" });
      }
      if (this.state.password === "") {
        this.setState({ errorPassword: "error" });
      }
      if (this.state.empID !== "" && this.state.EmpIDMsg === "") {
        this.setState({ errorEmpID: "" });
      }
      if (this.state.password !== "") {
        this.setState({ errorPassword: "" });
      }
    }
  }

 
  render() {
    return (
      <div className="container">
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header">
              <h3>Sign In</h3>
              <div className="d-flex justify-content-end social_icon" />
            </div>
            <div className="card-body">
              <div>
                <span style={{ color: "red" }}>{this.state.EmpIDMsg}</span>
                <span style={{ color: "red" }}>{this.state.err}</span>
                <span style={{ color: "red" }}>{this.state.sysErr}</span>
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-user" />
                  </span>
                </div>
                <input
                  type="text"
                  className={
                    this.state.errorEmpID
                      ? "form-control error"
                      : "form-control"
                  }
                  placeholder="empID"
                  onChange={this.setEmpID}
                />
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-key" />
                  </span>
                </div>
                <input
                  type="password"
                  placeholder="password"
                  onChange={this.setPassword}
                  className={
                    this.state.errorPassword
                      ? "form-control error"
                      : "form-control"
                  }
                />
              </div>
              <div className="row align-items-center remember" />
              <div className="form-group">
                <input
                  type="submit"
                  onClick={this.validate}
                  value="Login"
                  className="float-right loginbtn"
                />
              </div>
            </div>
            <div className="card-footer">
            <span> Contact Admin if you are not able to login </span>
            </div>
          </div>
        </div>
       
      </div>
    );
  }
}
export default Login;
