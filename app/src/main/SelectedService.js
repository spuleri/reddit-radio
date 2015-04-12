(function(){
  'use strict';

  angular.module('subreddits')
         .service('selectedService', ['$http',SelectedService]);

  /**
   * Selected Subreddit service.
   * In order to share the current selected subreddit b/w controllers
   
   * NOT WORKING AT THE MOMENT....... MIGHT NEED TO DELETE
   * 
   * @constructor
   */
  function SelectedService(){

    return {name: '', category: ''};

  }

})();
