export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      
    },
    {
      title: true,
      name: 'Actions',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'User Creation',
      url: '',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Create Roles',
          url: '/createRoles',
          icon: 'icon-puzzle',
        },
        {
          name: 'Create Events',
          url: '/createEvent',
          icon: 'icon-puzzle',
        }
      ],
    },
    {
      name: 'Emails',
      url: '',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Send Reminders',
          url: '/reminder',
          icon: 'icon-puzzle',
        },
        {
          name: 'Send Reports',
          url: '/report',
          icon: 'icon-puzzle',
        }
      ],
    },
    {
      title: 'Views',
      name: 'Views',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    }
    ,
    {
      name: 'Feedbacks',
      url: '',
      icon: 'icon-cursor',
      children: [
        {
          name: 'Feedback by BUs',
          url: '/bu',
          icon: 'icon-cursor'
        },
        {
          name: 'Feedback by City',
          url: '/city',
          icon: 'icon-cursor'
        },
        {
          name: 'Feedback by Country',
          url: '/country',
          icon: 'icon-cursor'
        },
        {
          name: 'Feedback by Beneficiary',
          url: '/beneficiary',
          icon: 'icon-cursor'
        }
        
      ]
    },
    {
      name: 'Reports',
      url: '',
      icon: 'icon-cursor',
      children: [
        {
          name: 'Download Feedback reports',
          url: '/downloadReport1',
          icon: 'icon-cursor'
        }
        
        
      ]
    }
  ]
};
