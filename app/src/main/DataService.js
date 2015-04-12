(function(){
  'use strict';

  angular.module('subreddits')
         .service('dataService', ['$q', '$http', DataService]);

  /**
   * Users DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * 
   * @constructor
   */
  function DataService($q, $http){



    this.getSubMedia = function(subreddit, type, time){

      var url="http://www.reddit.com"+subreddit.name+"/"+type+".json?jsonp=JSON_CALLBACK"+"&t="+time+"&limit=50";

      return $http.jsonp(url).then(function(data) {
        var posts = [];
        var dataset = data.data.data.children;

        for (var i = 0; i < dataset.length; i++ ){
          posts.push(dataset[i].data); // response data 
          //console.log(posts[i]);
        }

        return posts;
        // $scope.links = [];
        //   var x = 0;
        //   while($scope.links.length != 10){
        //     if($scope.elements[x].url.indexOf("soundcloud") != -1){
        //       console.log($scope.elements[x].url);
        //       $scope.links.push($scope.elements[x].url);
        //     }
        //     x++;
        //   }       

      }); 

    }



  }

})();
