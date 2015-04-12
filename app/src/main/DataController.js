(function(){

  angular
       .module('subreddits')
       .controller('DataController', [
          'subService','selectedService', 'dataService', '$mdSidenav', '$mdBottomSheet', '$log', '$q',
          DataController
       ]);

  /**
   * Data Controller, that grabs media
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function DataController( subService, selectedService, dataService, $mdSidenav, $mdBottomSheet, $log, $q) {
    var self = this;

    self.selected     = selectedService;
    self.getMedia     = getMedia;
    self.posts        = [];
    self.types = ['hot','top','new'];
    self.times = ['hour', 'day', 'week', 'month', 'year', 'all'];
    self.options      = ['Go to post', 'Add to Queue', 'Something else'];
    self.selectedType = null;
    self.selectedTime = null;

    self.clientid = '024415ac76d64496127f1631aa8db716';


    // *********************************
    // Internal methods
    // *********************************

    /**
     * First hide the bottomsheet IF visible, then
     * hide or Show the 'left' sideNav area
     */


    function getMedia() {
      self.loading = true;
      console.log(self.selected);
      dataService
        .getSubMedia(self.selected, self.selectedType, self.selectedTime)
        .then(function(data){
          console.log(data);
          for(var i = 0; i < data.length; ++i){
            if( data[i].url.match("soundcloud") || data[i].url.match("youtube") || data[i].url.match("spotify") ) {
              self.posts.push(data[i]);
            }
          }
          self.loading = false;
        })
    }

    /**
     * Select the current avatars
     * @param menuId
     */
    function selectSub ( user ) {
      self.selected = angular.isNumber(user) ? $scope.subreddits[user] : user;
      self.toggleList();
    }


  }

})();
