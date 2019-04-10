export default {
  items: [
   
    
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
    { title: 'View feedbacks',
      name: 'Feedbacks',
      url: '/viewFeedback',
      icon: 'icon-cursor',
      
    }]
};
