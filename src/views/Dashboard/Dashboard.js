import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from 'reactstrap';
import axios from 'axios'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'



const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')



const cardChartOpts1 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          
        },
      }],
  },
  elements: {
    line: {
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  }
}


const cardChartOpts2 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false
        },
      }],
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};


const cardChartOpts3 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};


const cardChartOpts4 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
        barPercentage: 0.6,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
};


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.counter=0;
   
    this.state = {feedback:[],cardChartData:[],
    feedCount:[],totalFeedbackExp:[]
    };
  }
componentWillMount(){
  console.log("coming hereeee")
axios
  .get(
    "http://172.18.2.50:9090/getFeedbackByMonth" ,{withCredentials: true,crossdomain : true}
    )
  .then(response => {
    
     this.setState({feedback: response.data })
   
     var dps=[],lab=[];
     for(var j=0;j<response.data.length; j++){
       lab.push(response.data [j][1])
       dps.push({
         y:response.data [j][0], label: response.data [j][1]
           
             });}
                     
  this.setState({cardChartData : {
 labels: lab,
  datasets: [
  {
     label: 'Avg Feedback',
      borderColor: 'rgba(255,255,255,.55)',
    //backgroundColor: brandPrimary,
     // borderColor: 'rgba(255,255,255,.55)',
      data:dps,
    },
     ],
   }})
  })
  .catch((err) => {
    console.log("dont knw whats happeningg")
    console.log("AXIOS ERROR: ", err);
    })
   axios.get("http://172.18.2.50:9090/getFeedbackDetailsForEvent",{withCredentials: true,crossdomain : true})
   .then(response=>{
   console.log(response.data)
    this.setState({feedCount:response.data[0]})
    this.setState({totalFeedbackExp:response.data[1]})
    
     
     
   }
  )
.catch((err)=>{
  console.log("dont knw whats happeningg")
  console.log("AXIOS ERROR: ", err);

});
}
 



  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                
                 <div>Monthly Avg Feedback</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                <Line data={this.state.cardChartData} options={cardChartOpts2} height={70} />
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
               
                
                <div>Monthly Avg Feedback</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                <Line data={this.state.cardChartData} options={cardChartOpts1} height={70} />
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-warning">
              <CardBody className="pb-0">
                
            
                <div>Monthly Avg Feedback</div>
              </CardBody>
              <div className="chart-wrapper" style={{ height: '70px' }}>
                <Line data={this.state.cardChartData} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-danger">
              <CardBody className="pb-0">
               
              
                <div>Monthly Avg Feedback</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                <Bar data={this.state.cardChartData} options={cardChartOpts4} height={70} />
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardBody>
               
        
                <br />
                <div  className="scrollingTableMain">
                 <h3 className="text-center"> Feedback Meter </h3>
                <Table hover responsive className="table-outline">
                  <thead className="thead-light">
                  <tr>
                   
                    <th>Event ID</th>
                    <th className="text-center">Feedback Recorded</th>
                    <th>POC</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      
                      this.state.totalFeedbackExp.map((feed)=>{
                        this.flag=0;
                     this.state.feedCount.map(f=>{
                      if(f[1]===feed[1]){
                        this.eventid=feed[1];
                        this.total=feed[0];
                        this.actual=f[0]
                        this.poc=feed[2]
                        this.eventname=feed[3]
                       this.flag=1
                      }
                    })
                    if(this.flag===0){
                        this.eventid=feed[1];
                        this.total=feed[0];
                        this.actual=0
                        this.poc=feed[2]
                        this.eventname=feed[3]
                    }
                     
                      
                     this.percent= parseInt(((this.actual/this.total)*100),10)
                     if(this.percent<=50){
                       this.color='danger'
                     }
                     else if(this.percent>50 && this.percent<80)
                      this.color='warning'
                     else
                     this.color='success'
                   
                    
                   return(     
                
                  <tr>
                    
                    <td>
                      <div>{this.eventid}</div>
                      <div className="small text-muted">
                        <span>Name</span> | {this.eventname}
                      </div>
                    </td>
                   
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>{this.percent}%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">Pending feedback: {this.total-this.actual}</small>
                        </div>
                      </div>
                      <Progress className="progress-xs" color={this.color} value={this.actual} max={this.total} />
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                         {this.poc}
                        </div>
                      </div>
                     
                    </td>
                  </tr>
                  
        ) })}
                  
                
              
                  </tbody>
                </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
