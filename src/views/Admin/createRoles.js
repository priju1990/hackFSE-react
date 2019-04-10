import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import {
   UncontrolledTooltip
} from "reactstrap";
import "react-notifications/lib/notifications.css";

class CreateRoles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      empIDMsg: "",
      phoneNumMsg: "",
      mandatoryMsg: "",
     
      empid: "",
      name: "",
      poc: "",
      role: "",
      phoneNum: "",
      msg: ""
    };
    this.captureNumber = this.captureNumber.bind(this);
   
    this.captureEmpid = this.captureEmpid.bind(this);
    this.captureName = this.captureName.bind(this);
    this.capturePOC = this.capturePOC.bind(this);
    this.selectRole = this.selectRole.bind(this);
    this.submitDetails = this.submitDetails.bind(this);
    this.upload = this.upload.bind(this);
  }
  upload(event) {
    event.preventDefault();

    axios
      .get("http://172.18.2.50:9090/loadRoles",{withCredentials: true,crossdomain : true})
      .then(response => {
        console.log(response);
        if (response.status == 200){
          NotificationManager.success("Role created", "Alert");
        console.log("success")
        }
      })
      .catch(err => {
        console.log(err.response.status);
        if (err.response.status === 409)
          NotificationManager.error("Duplicate EmpID", "Alert");
        else {
          NotificationManager.info(
            "Make sure the file exists in the server location ",
            "Alert"
          );
          NotificationManager.error("Some error has occured.", "Alert");
        }
      });
  }

  captureNumber(event) {
    console.log(this.state.phoneNum.length);
    if (this.state.phoneNum.length >= 10) {
      event.target.value = event.target.value.slice(0, 10);
      this.setState({ phoneNum: event.target.value });
    } else {
      this.setState({ phoneNum: event.target.value });
    }
    this.setState({ phoneNumMsg: "" });
  }
 
  captureEmpid(event) {
    if (this.state.empid.length >= 6) {
      event.target.value = event.target.value.slice(0, 6);
      this.setState({ empid: event.target.value });
    } else {
      this.setState({ empid: event.target.value });
    }

    this.setState({ empIDMsg: "" });
  }
  captureName(event) {
    this.setState({ name: event.target.value });
  }
  capturePOC(event) {
    this.setState({ poc: event.target.value });
  }
  selectRole(event) {
    this.setState({ role: event.target.value });
  
    
  }
  submitDetails = event => {
    event.preventDefault();
    if (
      this.state.empid === "" ||
      this.state.name === "" ||
      this.state.phoneNum === "" ||
      this.state.role === ""
    ) {
      this.setState({ mandatoryMsg: "Enter all the fields" });
    } else if (
      this.state.empid !== "" &&
      this.state.name !== "" &&
      this.state.phoneNum !== "" &&
      this.state.role != ""
    ) {
      this.setState({ mandatoryMsg: "" });
    }
    if (this.state.empid.length < 6) {
      this.setState({ empIDMsg: "error" });
    }
    if (this.state.phoneNum.length < 10) {
      this.setState({ phoneNumMsg: "error" });
    }
    if (
      this.state.empIDMsg === "" &&
      this.state.mandatoryMsg === "" &&
      this.state.phoneNumMsg === "" &&
      this.state.empid != "" &&
      this.state.name != "" &&
      this.state.phoneNum != "" &&
      this.state.role != ""
    ) {
      var data = {
        empID: this.state.empid,
        name: this.state.name,
        phoneNum: this.state.phoneNum,
      
        role: this.state.role
      };
      axios
        .post("http://172.18.2.50:9090/createRole", {withCredentials: true,crossdomain : true},data)
        .then(response => {
          if (response.status == 200)
            NotificationManager.success("Role created", "Alert");
        })
        .catch(err => {
          if (err.response.status === 409)
            NotificationManager.error("Duplicate EmpID", "Alert");
          else NotificationManager.error("Some error has occured.", "Alert");
        });
    }
  };

  render() {
    return (
      <div className="d-flex justify-content-center h-100">
        <div className="card h-100 w-100">
          <div className="card-header">
            <h3>Create POC/PMO</h3>
            <NotificationContainer />

            <div className="row">
              <div className="col-md-6 col-md-offset-3">
                <p>
                  {" "}
                  <span style={{ color: "red" }}>
                    {this.state.mandatoryMsg}
                  </span>
                </p>
                <form role="form" method="post" id="reused_form">
                  <div className="row">
                    <div className="col-sm-6 form-group">
                      <label>Employee ID </label>
                      <p>
                        <input
                          className={this.state.empIDMsg}
                          type="number"
                          name="empid"
                          id="empid"
                          placeholder="6 digit number"
                          onChange={this.captureEmpid}
                        />
                      </p>
                    </div>
                    <div className="col-sm-6 form-group">
                      <label>Emp Name</label>
                      <p>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          onChange={this.captureName}
                        />
                      </p>
                    </div>
                    <div className="col-sm-6 form-group">
                      <label>Phone number</label>
                      <p>
                        <input
                          className={this.state.phoneNumMsg}
                          type="number"
                          placeholder="10 digit number"
                          name="phone"
                          id="phone"
                          onChange={this.captureNumber}
                        />
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 form-group">
                      <label>Select role</label> <br/>
                      <label className="radio-inline">
                        <input
                          onClick={this.selectRole}
                          type="radio"
                          name="role"
                          id="role"
                          value="PMO"
                          checked="checked"
                        />
                        <span>PMO</span>
                      </label>

                      <label className="radio-inline">
                        <input
                          onClick={this.selectRole}
                          type="radio"
                          name="role"
                          id="role"
                          value="POC"
                        />
                        <span>POC</span>
                      </label>
                    </div>
                  </div>
                 
                  <div className="row">
                    <div className="col-sm-12 form-group">
                      <button
                        onClick={this.submitDetails}
                        type="submit"
                        className="btn btn-lg btn-primary btn-block"
                      >
                        Create →
                      </button>
                    </div>

                    <div className="col-sm-12 form-group">
                      <UncontrolledTooltip placement="right" target="btn">
                        Admin List.xlsx must exist at
                        C://Users/Admin/Documents/workspace-sts-3.9.7.RELEASE/Mailer/src/main/resources
                      </UncontrolledTooltip>
                      <button
                        id="btn"
                        onClick={this.upload}
                        type="submit"
                        className="btn btn-lg btn-primary btn-block"
                      >
                        Mass Load →
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default CreateRoles;
