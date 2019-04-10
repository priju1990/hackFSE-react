import React,{Suspense} from "react";
import ReactDOM from "react-dom";
import Graph from './graph'
import { Container } from 'reactstrap';
import {AppHeader,AppSidebarHeader,AppSidebar,AppSidebarForm}from '@coreui/react'


//import "../styles.css";
import axios from 'axios'
import {Dropdown,DropdownItem,DropdownToggle,DropdownMenu} from 'reactstrap';
const DefaultHeader = React.lazy(() => import('../../containers/DefaultLayout/DefaultHeader'));
class ViewFeedback extends React.Component {
  constructor(props){
    super(props)
    this.setGraph=this.setGraph.bind(this)
    this.showGraph=this.showGraph.bind(this)
    
    this.toggle = this.toggle.bind(this);
   
    this.state = {criteria:['city','country','bu','beneficiary'],selValue:'',title:'',
      dropdownOpen: false
    };


  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  
 
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

   

setGraph=(e)=>{
 
  this.setState({selValue:e})
 
 }
 showGraph(){
   return(<Graph groupby={this.state.selValue} title={this.state.title}/>);
 }
 componentWillMount(){
  
   if(sessionStorage.getItem('role')==="POC"){
     this.setState({title:'Count of ratings given for Event Num:'})
   this.setState({criteria:['event']})
 axios.get("http://172.18.2.50:9090/getEvents?empID="+sessionStorage.getItem('empID'),{withCredentials: true,crossdomain : true})
 .then(response=>{
   
 this.setState({criteria:response.data})
 
 }
 )
   }
   else{
    this.setState({title:'Average Feedback by :'})
   }
 }
   render() {
  
     return (
       
       <div class="container">
       
         <Dropdown  className="d-inline-block"  isOpen={this.state.dropdownOpen} toggle={this.toggle}>
   <DropdownToggle caret>
       Select option
   </DropdownToggle>
   <DropdownMenu>
   
   {this.state.criteria.map(i=>{
     if(sessionStorage.getItem('role')==='POC')
     return( <DropdownItem> <div onClick={()=>this.setGraph(i[0])}>{i[1]}</div></DropdownItem>);
       else
       return( <DropdownItem> <div onClick={()=>this.setGraph(i)}>Feedback by {i}</div></DropdownItem>);
       
 
    })}
    
   </DropdownMenu>
 </Dropdown>
 
        
          <div className="graph">{this.showGraph()} </div>
        
       </div>
     );
   }
 }
 export default ViewFeedback;
 
  
