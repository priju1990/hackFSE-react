import React from "react";
import   '../../scss/styles.css' 
import axios from 'axios'
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import "react-notifications/lib/notifications.css";
class Feedback extends React.Component {

    constructor(props){
        super(props);
        this.state={feedback:'',rating:0,msg:'',improvement:'',errorMsg:'',empID:'',eventID:'',bu:'',beneficiary:''}
        this.ratingSel=this.ratingSel.bind(this)
        this.collectFeedback=this.collectFeedback.bind(this)
        this.collectImporovment=this.collectImporovment.bind(this)
      
        this.submitVals=this.submitVals.bind(this)
       
    }

    ratingSel(event){
        this.setState({rating:event.target.value})
    }
    submitVals(event){
      event.preventDefault();
       
       
      if(this.state.rating<3 && this.state.improvement===''){
        this.setState({errorMsg:"Please provide ways to improve the activity"})

      }
      else{
        var data ={beneficiary:this.state.beneficiary, empID:this.state.empID,description:this.state.feedback,rating:this.state.rating,eventID:this.state.eventID,businessUnit:this.state.bu,improvement:this.state.improvement};
        this.setState({errorMsg:''})
        axios
        .put(
          "http://172.18.2.50:9090/persistFeedback" ,data,{withCredentials: true,crossdomain : true}
         
        )
        .then(response => {
        
          if (response.status == 200){
            console.log("Success")
          NotificationManager.success("Feedback Submitted", "Alert");}
        })
        .catch((err) => {
          NotificationManager.error("Some error has occured.", "Alert");
          })}

    }
    collectFeedback(e){
     
        this.setState({feedback:e.target.value})
    }
    collectImporovment(e){
      this.setState({improvement:e.target.value})
    }
    componentWillMount(){
      let search = window.location.search;
      let params = new URLSearchParams(search);
      let empID = params.get('empID');
      let eventID = params.get('eventID');
      let bu = params.get('bu');
      let beneficiary=params.get('beneficiary');
      this.setState({empID:empID, eventID:eventID,bu:bu,beneficiary:beneficiary})
    }
  render() {
    return (
        <div className="container">
      <div className="d-flex justify-content-center h-100">
        <div className="deck h-100 w-100">
          <div className="card-header">
            <h2> {this.state.msg}</h2>
            <h3>Feedback</h3>
            <div className="row">
              <div className="col-md-6 col-md-offset-3">
                <p>Please provide your feedback below:</p>
                <NotificationContainer />
                <form role="form" method="post" id="reused_form">
                  <div className="row">
                    <div className="col-sm-12 form-group">
                      <label>How do you rate your overall experience?</label>
                      <p className="smiley">
                      <label className="radio-inline">
                          <input
                            onClick={this.ratingSel}
                            type="radio"
                            name="experience"
                            id="radio_experience"
                            value="1"
                          />
                          <i className="far fa-angry smile" />{" "}
                        </label>
                        <label className="radio-inline">
                          <input
                            onClick={this.ratingSel}
                            type="radio"
                            name="experience"
                            id="radio_experience"
                            value="2"
                          />
                          <i className="far fa-frown smile" />{" "}
                        </label>

                        <label className="radio-inline">
                          <input
                          onClick={this.ratingSel}
                            type="radio"
                            name="experience"
                            id="radio_experience"
                            value="3"
                          />
                          <i className="far fa-meh smile" />{" "}
                        </label>
                      
                          <label className="radio-inline">
                            <input
                            onClick={this.ratingSel}
                              type="radio"
                              name="experience"
                              id="radio_experience"
                              value="4"
                            />
                            <i className="far fa-smile smile" />{" "}
                          </label>
                          <label className="radio-inline">
                          <input
                            onClick={this.ratingSel}
                            type="radio"
                            name="experience"
                            id="radio_experience"
                            value="5"
                          />
                          <i className="far fa-smile-beam smile" />
                        </label>
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 form-group">
                      <label for="comments">What did you like about the volunteering activity?</label>
                      <textarea
                      onChange={this.collectFeedback}
                        className="form-control"
                        type="textarea"
                        name="comments"
                        id="comments"
                        placeholder="Your Comments"
                        maxLength="6000"
                        rows="7"
                      />
                    </div>
                  </div>

                  <div className="row">
                  <span style={{ color: "red" }}>{this.state.errorMsg}</span>
                    <div className="col-sm-12 form-group">
                      <label for="comments">How can we improve the volunteering activity?</label>
                      <textarea
                      onChange={this.collectImporovment}
                        className="form-control"
                        type="textarea"
                        name="improvement"
                        id="improvement"
                        placeholder="Your Comments"
                        maxLength="6000"
                        rows="7"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-12 form-group">
                      <button
                      onClick={this.submitVals}
                        type="submit"
                        className="btn btn-lg btn-primary btn-block"
                      >
                        Send →
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}
export default Feedback;
