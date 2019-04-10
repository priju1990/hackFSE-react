import React, { Component } from "react";
import axios from "axios";
import  '../../scss/styles.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {
  Table,
  Card,
  CardBody,
  CardColumns,
  CardHeader,
  Row,
  Col
} from "reactstrap";
import ReactExport from "react-data-export";
import { TablePagination } from 'react-pagination-table';
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
class DownloadExcelFeedback1 extends Component {
  constructor(props) {
    super(props);
    this.tab1 = [];
    
    this.state = {
      tab1: [],tab2:[],feed1 :[],
      feed2 : [],
      dataFeed: [],
      dataSet1: [],
      content:
        " It is observed that you have not recorded your feedback/comments related to the Outreach event.Please click on the link and provide your inputs. Your inputs are vital for improving the Outreach events. Please corporate."
    };
    axios.get("http://172.18.2.50:9090/downloadFeedbackReport",{withCredentials: true,crossdomain : true}).then(response => {
        this.setState({tab1:response.data[0],tab2:response.data[1]})
        console.log(response.data);
        response.data[0].map(d1 => {
          this.state.feed1.push({
            SLNum: d1[0],
            EmpID: d1[1],
            EventID: d1[2],
            Rating: d1[3],
            Description: d1[4],
            Improvement: d1[5],
            BU: d1[6]
          });
        });
    
        response.data[1].map(d1 => {
          this.state.feed2.push({
            SLNum: d1[0],
            EmpID: d1[1],
            EventID: d1[2],
            Description: d1[3],
            BU: d1[4]
          });
        });
      });  

  }

 
  render() {
    const height1 =document.body.clientHeight +"px";
    return (
      <div >
      <Row>
          <Col>
            <Card >
              <CardBody>
                  <div  class="scrollingTable">
                <Table hover responsive className="table-outline">
                <thead className="thead-light">
                       <tr> 
                           <th> SL No</th>
                           <th>EmpID </th>
                           <th> EventID</th>
                           <th> Rating</th>
                           <th>Description </th>
                           <th>Improvement </th>
                           <th>BU </th>
                       </tr>

                   </thead>
                    <tbody >
                {this.state.tab1.map((d, index) => {
                    return (
                      <tr>
                      <td>{d[0]}</td> <td>{d[1]}</td> <td>{d[2]}</td>
                        <td>{d[3]}</td> <td>{d[4]}</td> <td>{d[5]}</td>
                        <td>{d[6]}</td>
                      </tr>
                    );
                  })}
                  </tbody>
                
                </Table>
                </div>
                <ExcelFile element={<button>Download</button>}>
                  <ExcelSheet data={this.state.feed1} name="Feedback">
                    <ExcelColumn label="SLNum" value="SLNum" />
                    <ExcelColumn label="EmpID" value="EmpID" />
                    <ExcelColumn label="EventID" value="EventID" />
                    <ExcelColumn label="Rating" value="Rating" />
                    <ExcelColumn label="Description" value="Description" />
                    <ExcelColumn label="Improvement" value="Improvement" />
                    <ExcelColumn label="BU" value="BU" />
                  </ExcelSheet>
                </ExcelFile>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col >
            <Card >
              <CardBody >
              <div  class="scrollingTable">
                  <Table hover responsive className="table-outline" >
                  <thead className="thead-light">
                       <tr> 
                           <th> SL No</th>
                           <th>EmpID </th>
                           <th> EventID</th>
                          
                           <th>Description </th>
                          
                           <th>BU </th>
                       </tr>

                   </thead>
                {this.state.tab2.map((d, index) => {
                    return (
                      <tr>
                      <td>{d[0]}</td> <td>{d[1]}</td> <td>{d[2]}</td>
                        <td>{d[3]}</td> <td>{d[4]}</td>
                      </tr>
                    );
                  })}
                </Table>
                </div>
                <ExcelFile element={<button>Download</button>}>
                  <ExcelSheet data={this.state.feed2} name="Feedback">
                    <ExcelColumn label="SL Num" value="SL Num" />
                    <ExcelColumn label="EmpID" value="EmpID" />
                    <ExcelColumn label="EventID" value="EventID" />
                   
                    <ExcelColumn label="Description" value="Description" />
                   
                    <ExcelColumn label="BU" value="BU" />
                  </ExcelSheet>
                </ExcelFile>
              </CardBody>
            </Card>
          </Col>
        </Row>
       
      </div>
    );
  
  }
}

export default DownloadExcelFeedback1;
