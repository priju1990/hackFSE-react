import React, { Component } from 'react';
import axios from 'axios'
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

import "react-notifications/lib/notifications.css";
class Reminders extends Component {
  constructor(props) {
    super(props);
    this.state={msg:"It is observed that you have not recorded your feedback/comments related to the Outreach event. Please click on the link and provide your inputs. Your inputs are vital for improving the Outreach events. Please corporate."}
      this.submit=this.submit.bind(this);
     
  }

  
  submit(e){
    e.preventDefault();
  
    axios.get("http://172.18.2.50:9090/getDefaulters?msg="+this.state.msg,{withCredentials: true,crossdomain : true})
    .then(response=> {
      console.log(response.data)
      if(response.status===200)
      NotificationManager.success("Reminders sent", "Alert");
      
    })
    .catch((err) => {
    
  
    
      NotificationManager.error("Some error has occured.", "Alert");
  });
  }
  handleChange=(e)=>{
    e.preventDefault();
    this.setState({msg:e.target.value})
  }
  render() {
    return (
      <div className="animated fadeIn">
       <div className="container">
    <div className="d-flex justify-content-center h-100">
      <div className="card h-100 w-100">
        <div className="card-header">
        
          <h3>Trigger Reminder Mails for the defaulters</h3>
          <NotificationContainer />
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
                <div className="row">
                  <div className="col-sm-12 form-group">
                    <p> 
                      Content for Reminder Emails
                    </p>
                <textarea onChange={this.handleChange}  className="form-control"
                        type="textarea"
                        name="improvement"
                        id="improvement"
                       value= {this.state.msg}
                        maxLength="6000"
                        rows="7"/>
          
                  </div>
                </div>
                <input type="submit" onClick={this.submit}/>
                </div>
                </div>
                </div></div>
                
                </div> </div>
                
       </div>
                    );
  }
}

export default Reminders;
