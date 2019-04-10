import React, { Component, Suspense } from "react";
import {
  Redirect,
  Route,
  Switch,
  BrowserRouter,
  HashRouter
} from "react-router-dom";
import { Container } from "reactstrap";
import ReactDOM from "react-dom";
import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav
} from "@coreui/react";
// sidebar nav config
import navigation from "../../_nav";
import navigationOther from "../../_navOther";
// routes config
import routes from "../../routes";
import CreateEvent from "../../views/Admin/createEvent";
import CreateRoles from "../../views/Admin/createRoles";
import ViewFeedback from "../../views/Admin/viewFeedback";
import Graph from "../../views/Admin/graph";
import Dashboard from "../../views/Dashboard/Dashboard";
import Login from "../../views/Admin/login";
import Reminders from "../../views/Admin/Reminder";
import Report from "../../views/Admin/Report";

import DownloadExcelFeedback1 from "../../views/Admin/downloadExcelFeedback1";
import axios from 'axios'
const DefaultAside = React.lazy(() => import("./DefaultAside"));
const DefaultFooter = React.lazy(() => import("./DefaultFooter"));
const DefaultHeader = React.lazy(() => import("./DefaultHeader"));


class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    this.state = { nav: "", view: "" };
  }
  componentWillMount() {
    if(null!=sessionStorage.getItem("loggedIn") ){
    var currentDate = new Date().getMinutes();
    var sessionObject = JSON.parse(sessionStorage.getItem("loggedIn"));
    var expirationDate = sessionObject.expiresAt;
    console.log(expirationDate+"expiration time" +currentDate)
    if (parseInt(currentDate) > parseInt(expirationDate)) {
      console.log("coming here")
        sessionStorage.removeItem("loggedIn");
      console.log("session expired");
      this.props.history.push("/login");
    }
    if (sessionStorage.getItem("role") != "Admin") {
      this.setState({ nav: navigationOther, view: "/viewFeedback" });
    } else this.setState({ nav: navigation, view: "/dashboard" });
  }
  else{
    console.log("session not exisitng");
    this.props.history.push("/login");
  }
  }
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  signOut(e) {
    e.preventDefault();

    sessionStorage.removeItem("loggedIn");
    console.log("session removed");
    axios.get("http://172.18.2.50:9090/logout",{withCredentials: true,crossdomain : true})
    this.props.history.push("/login");
  }
  changePwd(e) {
    this.props.history.push("/changePwd");
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader
              onLogout={e => this.signOut(e)}
              changePwd={e => this.changePwd(e)}
            />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav navConfig={this.state.nav} {...this.props} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} />
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  <Route
                    name="Feedback"
                    exact
                    path="/viewFeedback"
                    component={ViewFeedback}
                  />
                  <Route
                    name="Dashboard"
                    exact
                    path="/dashboard"
                    component={Dashboard}
                  />
                  <Route
                    name="Create Events"
                    exact
                    path="/createEvent"
                    component={CreateEvent}
                  />
                  <Route
                    name="Create Roles"
                    exact
                    path="/createRoles"
                    component={CreateRoles}
                  />
                  <Route
                    name="Reminders"
                    exact
                    path="/reminder"
                    component={Reminders}
                  />
                  <Route
                    name="Report"
                    exact
                    path="/report"
                    component={Report}
                  />
                  <Route
                    name="DownloadReport"
                    exact
                    path="/downloadReport1"
                    component={DownloadExcelFeedback1}
                  />
                  <Route
                    name="Feedback by BU"
                    exact
                    path="/bu"
                    render={() => (
                      <Graph groupby="bu" title="Avg feedback by:" />
                    )}
                  />
                  <Route
                    name="Feedback by City"
                    exact
                    path="/city"
                    render={() => (
                      <Graph groupby="city" title="Avg feedback by:" />
                    )}
                  />
                  <Route
                    name="feedback by Country"
                    exact
                    path="/country"
                    render={() => (
                      <Graph groupby="country" title="Avg feedback by:" />
                    )}
                  />
                  <Route
                    name="feedback by Country"
                    exact
                    path="/beneficiary"
                    render={() => (
                      <Graph groupby="beneficiary" title="Avg feedback by:" />
                    )}
                  />
                  <Redirect from="/country" to="/country" />
                  <Redirect from="/city" to="/city" />
                  <Redirect from="/bu" to="/bu" />
                  <Redirect from="/dashboard" to="/dashboard" />
                  <Redirect from="/reminder" to="/reminder" />
                  <Redirect from="/viewFeedback" to="/viewFeedback" />
                  <Redirect from="/createEvent" to="/createEvent" />
                  <Redirect from="/createRoles" to="/createRoles" />
                  <Redirect from="/report" to="/report" />
                  <Redirect from="/downloadReport1" to="/downloadReport1" />
                  <Redirect from="/beneficiary" to="/beneficiary" />
                </Switch>
              </Suspense>
            </Container>
          </main>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
