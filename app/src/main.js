angular
    .module('starterApp', ['ngMaterial','lumx', 'subreddits'])
    .config(function($mdThemingProvider, $mdIconProvider){

        $mdIconProvider
            .defaultIconSet("./assets/svg/avatars.svg", 128)
            .icon("menu"       , "./assets/svg/menu.svg"        , 24)
            .icon("share"      , "./assets/svg/share.svg"       , 24)
            .icon("google_plus", "./assets/svg/google_plus.svg" , 512)
            .icon("hangouts"   , "./assets/svg/hangouts.svg"    , 512)
            .icon("twitter"    , "./assets/svg/twitter.svg"     , 512)
            .icon("done"      , "./bower_components/material-design-icons/action/svg/production/ic_done_48px.svg") 
            .icon("more"      , "./bower_components/material-design-icons/navigation/svg/production/ic_more_vert_48px.svg") 
            .icon("phone"      , "./assets/svg/phone.svg"       , 512);

            $mdThemingProvider.theme('default')
                .primaryPalette('indigo')
                .accentPalette('blue-grey');

    });

