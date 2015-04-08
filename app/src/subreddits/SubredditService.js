(function(){
  'use strict';

  angular.module('subreddits')
         .service('userService', ['$q', '$http', UserService]);

  /**
   * Users DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function UserService($q, $http){

    var mainInfo = null;
    //getting the text file of music subreddits
    var subreddits = [];
    this.getSubreddits = function(){
      return $http.get('../../assets/subreddits.txt').then(function(data) {
        /*need to do data.data cuz using then to chain response instead of success
        checkout: http://chariotsolutions.com/blog/post/angularjs-corner-using-promises-q-handle-asynchronous-calls/
        at composing promises*/
        mainInfo = data.data;

        var lines = mainInfo.split('\n');

        var tag = '';
        for(var line = 0; line < lines.length; line++){

          if(lines[line].charAt(0) === '/'){
            
            var subreddit = {
              name: lines[line],
              category: tag
            };
            subreddits.push(subreddit);
          }
          if(lines[line].charAt(0) !== '' && lines[line].charAt(0) !== '/'){
            tag = lines[line];

          } 

        }
        return subreddits;
      });
    };

  }

})();
