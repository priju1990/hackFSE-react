import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import {
   UncontrolledTooltip
} from "reactstrap";
import "react-notifications/lib/notifications.css";
class CreateEvent extends React.Component {
  constructor(props){
    super(props);
    this.state={id:'',city:'',country:'',month:'',poc:'',name:'',idError:'error',nameError:'error',pocError:'error',countryError:'error',cityError:'error',dayError:'error'}
    this.submitDetails=this.submitDetails.bind(this)
    this.captureEventID=this.captureEventID.bind(this)
    this.captureEventName=this.captureEventName.bind(this)
    this.captureDate=this.captureDate.bind(this)
    this.capturePOC=this.capturePOC.bind(this)
    this.captureCity=this.captureCity.bind(this)
    this.captureCountry=this.captureCountry.bind(this)
    this.upload=this.upload.bind(this)
}
upload(event){
  event.preventDefault();
  axios.get("http://172.18.2.50:9090/loadEvents",{withCredentials: true,crossdomain : true})
  .then(response => {
    console.log(response)
    if(response.status===200)
    NotificationManager.success("Event created", "Alert");
    
     
   })
   .catch((err) => {
     console.log(err)
     if (err.response.status === 500)
    
   {NotificationManager.info(
     "Make sure the file exists in the server location ",
     "Alert"
   );
     NotificationManager.error("Some error has occured.", "Alert");}
 });
}
submitDetails(event){
  event.preventDefault();
  if(this.state.idError===''&&this.state.nameError==''&&this.state.dayError==''&&this.state.countryError==''&&this.state.pocError==''){
  var data={id:this.state.id,name:this.state.name,city:this.state.city,country:this.state.country,poc:this.state.poc,month:this.state.month}
  axios.post("http://172.18.2.50:9090/createEvent",data,{withCredentials: true,crossdomain : true})
  .then(response => {
    console.log(response)
    if(response.status==200)
    NotificationManager.success("Event created", "Alert");
     else
     NotificationManager.error("Some error has occured", "Alert");
   })
   .catch((err) => {
      
       NotificationManager.error("Some error has occured", "Alert");
       console.log("AXIOS ERROR: ", err);
     })}
    }
captureEventID(event){
  this.setState({id:event.target.value})
  if(this.state.id!='')
    this.setState({idError:''})
}
captureEventName(event){
  this.setState({name:event.target.value})
  if(this.state.name!='')
  this.setState({nameError:''})
}
captureCity(event){
  this.setState({city:event.target.value})
  if(this.state.city!='')
  this.setState({cityError:''})
  
}
captureCountry(event){
  this.setState({country:event.target.value})
  if(this.state.country!='')
  this.setState({countryError:''})
}
capturePOC(event){
  this.setState({poc:event.target.value})
  if(this.state.poc!='')
  this.setState({pocError:''})
}
captureDate(event){
  this.setState({month:event.target.value})
  if(this.state.month!='')
  this.setState({dayError:''})
}
  render() {
    return (
      <div className="d-flex justify-content-center h-100">
        <div className="card h-100 w-100">
          <div className="card-header">
            <h3>Create Event</h3>
            <NotificationContainer />
            <div className="row">
              <div className="col-md-6 col-md-offset-3">
                <p>Provide details of the event</p>
                <form role="form" method="post" id="reused_form">
                <div className="row">
                    <div className="col-sm-6 form-group">
                      <label>Event ID</label>
                      <p>
                        <input type="text" className={this.state.idError} name="eventid" id="eventid" onChange={this.captureEventID}/>
                      </p>
                    </div>
                    </div>
                  <div className="row">
                    <div className="col-sm-6 form-group">
                      <label>Event Name</label>
                      <p>
                        <input type="text"   className={this.state.nameError} name="event" id="event" onChange={this.captureEventName}/>
                      </p>
                    </div>
                    <div className="col-sm-6 form-group">
                      <label>City</label>
                      <p>
                        <input type="text"  className={this.state.cityError} name="city" id="city" onChange={this.captureCity}/>
                      </p>
                    </div>
                    <div className="col-sm-6 form-group">
                      <label>Country</label>
                      <p>
                        <input type="text"   className={this.state.countryError} name="country" id="country" onChange={this.captureCountry}/>
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 form-group">
                      <label>Date of event</label>
                      <p>
                        <input type="date" name="day"  className={this.state.dayError} id="day" placeholder="dd/mm/yyyy"  onChange={this.captureDate}/>
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 form-group">
                      <label for="comments">Point of contact</label>
                      <input type="number" name="poc" id="poc"  className={this.state.pocError}  onChange={this.capturePOC}/>
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
                        Outreach Event Summary.xlsx must exist at
                        C://Users/Admin/Documents/workspace-sts-3.9.7.RELEASE/Mailer/src/main/resources
                      </UncontrolledTooltip>
                      <button
                      id="btn"
                      onClick={this.upload}
                        type="submit"
                        className="btn btn-lg btn-primary btn-block"
                      >
                        Mass Load→
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
export default CreateEvent;
