import axios from "axios";
//import React from 'react'
import { Bar, Doughnut, Line, Pie, Polar, Radar } from "react-chartjs-2";
import { Card, CardBody, CardColumns, CardHeader, Row, Col } from "reactstrap";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import html2canvas from 'html2canvas'
var React = require("react");


const optionsBar = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  legend: { display: false },
  maintainAspectRatio: false,
  scales: {
    xAxes: [
      {
        display: true,
        barPercentage: 0.6
      }
    ],
    yAxes: [
      {
        display: false,

        ticks: {
          display: true,
          min: 0,
          max: 5
        }
      }
    ]
  }
};
const optionsPie = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  legend: { display: true },
  maintainAspectRatio: false,
  scales: {
    xAxes: [
      {
        display: false,
        barPercentage: 0.6
      }
    ],
    yAxes: [
      {
        display: false,

        ticks: {
          display: true,
          min: 0,
          max: 5
        }
      }
    ]
  }
};

class Graph extends React.Component {
  constructor(props) {
		super(props);
	
    this.state = { feedback: [] };
    this.getFeedbackByEvent = this.getFeedbackByEvent.bind(this);
    this.drawGraphForEvent = this.drawGraphForEvent.bind(this);
	}
	saveImage=()=>{
		var input = document.getElementById('chart');
		html2canvas(input)
		.then((canvas) =>{
			let imgData = canvas.toDataURL('image/png').replace("image/png", "image/octet-stream");
			 this.downloadURL(imgData);
		});
	}
	
	downloadURL(imgData){
		var a = document.createElement('a');
		a.href = imgData.replace("image/png", "image/octet-stream");
		a.download = 'graph.png';
		a.click();
	}
  getFeedbackByEvent = (id) => {
    axios
      .get("http://172.18.2.50:9090/getFeedbackByEvent?eventID=" + id,{withCredentials: true,crossdomain : true})
      .then(response => {
        this.setState({ feedback: response.data });
      })
      .catch(err => {
        console.log("dont knw whats happeningg");
        console.log("AXIOS ERROR: ", err);
      });
  };
  getFeedbackByBU = () => {
    axios
      .get("http://172.18.2.50:9090/getFeedbackByBU",{withCredentials: true,crossdomain : true})
      .then(response => {
        this.setState({ feedback: response.data });
      })
      .catch(err => {
        console.log("dont knw whats happeningg");
        console.log("AXIOS ERROR: ", err);
      });
  };
  getFeedbackByCountry = () => {
    axios
      .get("http://172.18.2.50:9090/getFeedbackByCountry",{withCredentials: true,crossdomain : true})
      .then(response => {
        this.setState({ feedback: response.data });
      })
      .catch(err => {
        console.log("dont knw whats happeningg");
        console.log("AXIOS ERROR: ", err);
      });
  };
  getFeedbackByBeneficiary = () => {
    axios
      .get("http://172.18.2.50:9090/getFeedbackByBeneficiary",{withCredentials: true,crossdomain : true})
      .then(response => {
        this.setState({ feedback: response.data });
      })
      .catch(err => {
        console.log("dont knw whats happeningg");
        console.log("AXIOS ERROR: ", err);
      });
  };
  getFeedbackByCity = () => {
    axios
      .get("http://172.18.2.50:9090/getFeedbackByCity",{withCredentials: true,crossdomain : true})
      .then(response => {
        this.setState({ feedback: response.data });
      })
      .catch(err => {
        console.log("dont knw whats happeningg");
        console.log("AXIOS ERROR: ", err);
      });
  };
  getRandomColor() {
    var letters = "789ABCD".split("");
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.round(Math.random() * 6)];
    }
    return color;
  }
  drawGraphForEvent() {
    if (this.state.feedback.length > 0) {
      var dps = [];
      this.label = [];
      this.dataset = [];
      this.color = [];
      for (var j = 0; j < this.state.feedback.length; j++) {
        /*	dps.push({
				y:this.state.feedback[j][0], label: this.state.feedback[j][1]
				  
						});*/
        this.label[j] = this.state.feedback[j][1];
        this.dataset[j] = this.state.feedback[j][0];
        this.color[j] = this.getRandomColor();
      }

      this.data = {
        labels: this.label,
        datasets: [
          {
            label: "Avg feedback:",
            data: this.dataset
          }
        ]
      };
      this.dataPie = {
        labels: this.label,
        datasets: [
          {
            label: "Avg feedback:",
            data: this.dataset,
            backgroundColor: this.color,
            hoverBackgroundColor: this.color
          }
        ]
      };
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props.groupby + "grouped by!!!");
    if (nextProps.groupby) {
      if (nextProps.groupby === "city") this.getFeedbackByCity();
      else if (nextProps.groupby === "bu") this.getFeedbackByBU();
      else if (nextProps.groupby === "country") this.getFeedbackByCountry();
      else if (nextProps.groupby === "beneficiary") this.getFeedbackByBeneficiary();
      
      else if (this.props.groupby !== "")
        this.getFeedbackByEvent(nextProps.groupby);
    }
  }
  componentWillMount() {
    if (this.props.groupby === "city") this.getFeedbackByCity();
    else if (this.props.groupby === "bu") this.getFeedbackByBU();
    else if (this.props.groupby === "country") this.getFeedbackByCountry();
    else if (this.props.groupby === "beneficiary") this.getFeedbackByBeneficiary();
    else if (this.props.groupby !== "")
      this.getFeedbackByEvent(this.props.groupby);
  }

  render() {
    this.drawGraphForEvent();

    return (
			<div>
				 <button className="k-button" onClick={this.saveImage}>Export as Image</button>
				 <div id="chart">	       
      <Row >
        <Col >
          <Card className="text-white bg-info">
            <CardBody className="pb-0">
              <div>
                {this.props.title} {this.props.groupby}
              </div>
            </CardBody>
            <div className="chart-wrapper mx-3" style={{ height: "200px" }}>
              <Bar  data={this.data} options={optionsBar} height={70} />
            </div>
          </Card>
        </Col>
        <Col>
          <Card className="text-white bg-info">
            <CardBody className="pb-0">
              <div>
                {this.props.title} {this.props.groupby}
              </div>
            </CardBody>
            <div className="chart-wrapper mx-3" style={{ height: "200px" }}>
              <Pie data={this.dataPie} options={optionsPie} height={70} />
            </div>
          </Card>
        </Col>
      </Row>
		</div>
			</div>
    );
  }
}
export default Graph;
