(function(){

  angular
       .module('subreddits')
       .controller('SubredditController', [
          'subService','selectedService', '$mdSidenav', '$mdBottomSheet', '$log', '$q',
          SubredditController
       ]);

  /**
   * Subreddit controller for Reddit Radio 
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function SubredditController( subService, selectedService, $mdSidenav, $mdBottomSheet, $log, $q) {
    var self = this;

    self.selected     = selectedService = null;
    self.subreddits   = [ ];
    self.selectSub   = selectSub;
    self.toggleList   = togglesubredditsList;
    self.share        = share;
    self.searchText    = null;
    self.querySearch  = querySearch;
    self.createFilterFor  = createFilterFor;

    // Load all registered subreddits

    subService
          .getSubreddits()
          .then( function( subs ) {
              self.subreddits = [].concat(subs);             
          });

    // *********************************
    // Internal methods
    // *********************************

    /**
     * First hide the bottomsheet IF visible, then
     * hide or Show the 'left' sideNav area
     */
    function togglesubredditsList() {
      var pending = $mdBottomSheet.hide() || $q.when(true);

      pending.then(function(){
        $mdSidenav('left').toggle();
      });
    }

    /**
     * Select the current avatars
     * @param menuId
     */
    function selectSub ( user ) {
      self.selected = angular.isNumber(user) ? $scope.subreddits[user] : user;
      self.toggleList();
    }

    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {

      var results = query ? self.subreddits.filter( createFilterFor(query) ) : [];

      return results;
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(subreddit) {
        return ( angular.lowercase(subreddit.name).match(lowercaseQuery) ||
         angular.lowercase(subreddit.category).match(lowercaseQuery) );
      };
    }

    /**
     * Show the bottom sheet
     */
    function share($event) {
        var user = self.selected;

        $mdBottomSheet.show({
          parent: angular.element(document.getElementById('content')),
          templateUrl: '/src/subreddits/view/contactSheet.html',
          controller: [ '$mdBottomSheet', subredditsheetController],
          controllerAs: "vm",
          bindToController : true,
          targetEvent: $event
        }).then(function(clickedItem) {
          clickedItem && $log.debug( clickedItem.name + ' clicked!');
        });

        /**
         * Bottom Sheet controller for the Avatar Actions
         */
        function subredditsheetController( $mdBottomSheet ) {
          this.user = user;
          this.items = [
            { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
            { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
            { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
            { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
          ];
          this.performAction = function(action) {
            $mdBottomSheet.hide(action);
          };
        }
    }

  }

})();
