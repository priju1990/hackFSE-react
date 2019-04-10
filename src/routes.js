import React from 'react';
import DefaultLayout from './containers/DefaultLayout';


const Dashboard = React.lazy(() => import('./views/Dashboard'));

const CreateRoles = React.lazy(() => import('./views/Admin/createRoles'));
const CreateEvent = React.lazy(() => import('./views/Admin/createEvent'));
const Graph = React.lazy(() => import('./views/Admin/graph'));
const Reminders= React.lazy(() => import('./views/Admin/Reminder'));


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/dashboard', exact: true, name: 'Home', component: Dashboard },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
   { path: '/createRoles', name: 'Create Roles', component: CreateRoles },
   { path: '/reminder', name: 'Send Reminder', component: Reminders},
  { path: '/createEvent', name: 'Create Events', component: CreateEvent },
  { path: '/bu', name: 'Feedback By BU',component: Graph},
  { path: '/city', name: 'Feedback by City',component: Graph},
  { path: '/country', name: 'Feedback by Country',component: Graph},
  { path: '/viewFeedback', exact: true, name: 'View Feedback', component: Graph },

 
];

export default routes;
