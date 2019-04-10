import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 11 support
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.scss';
import Loadable from 'react-loadable';

import * as serviceWorker from './serviceWorker';

import { Redirect, Route, Switch,HashRouter ,BrowserRouter} from 'react-router-dom';
import Login from './views/Pages/Login'
import Feedback1 from './views/Associate/feedback'
import Feedback2 from './views/Associate/feedbackUnreg'
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = Loadable({
    loader: () => import('./containers/DefaultLayout'),
    loading
  });

const ChangePWD = Loadable({
  loader: () => import('./views/Pages/changePWD'),
  loading
});
class Home extends React.Component {

render(){
    return(
        <div id="home">
    <BrowserRouter>
    <Switch>
      <Route   path="/login" name="Login Page" component={Login} />
      <Route  path="/feedback1" name="Feedback Page" component={Feedback1} />
      <Route  path="/feedback2" name="Feedback Page" component={Feedback2} />
     
         
            <Route  path="/changePwd" name="Change Password" component={ChangePWD}/>
            <Route   path="/dashboard" name="Home" component={DefaultLayout} />
            <Route   path="/country" name="Home" component={DefaultLayout} />
            <Route   path="/reminder" name="Home" component={DefaultLayout} />
            <Route   path="/report" name="Home" component={DefaultLayout} />
            <Route   path="/createEvent" name="Home" component={DefaultLayout} />
            <Route   path="/city" name="Home" component={DefaultLayout} />
            <Route   path="/bu" name="Home" component={DefaultLayout} />
            <Route   path="/beneficiary" name="Home" component={DefaultLayout} />
            <Route   path="/viewFeedback" name="Home" component={DefaultLayout} />
            <Route   path="/createRoles" name="Home" component={DefaultLayout} />
            <Route   path="/downloadReport1" name="Home" component={DefaultLayout} />
      
    
    </Switch>
</BrowserRouter>
</div>
);
}}

ReactDOM.render(<Home />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
