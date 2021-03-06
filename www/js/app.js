// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ionicLazyLoad', 'firebase', 'starter.controllers' ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.game', {
    url: "/game",
    views: {
      'menuContent': {
        templateUrl: "templates/game.html",
        controller: 'GameCtrl'
      }
    }
  })

 .state('app.instructions', {
    url: "/instructions",
    views: {
      'menuContent': {
        templateUrl: "templates/instructions.html"        
      }
    }
  })
  .state('app.select-game', {
    url: "/select-game",
    views: {
      'menuContent': {
        templateUrl: "templates/select-game.html",
        controller: 'GameCtrl'        
      }
    }
  })
  .state('app.host-game', {
    url: "/host-game",
    views: {
      'menuContent': {
        templateUrl: "templates/host-game.html",
        controller: 'GameCtrl'
      }
    }
  }).state('app.join-game', {
    url: "/join-game",
    views: {
      'menuContent': {
        templateUrl: "templates/join-game.html",
        controller: 'GameCtrl'
      }
    }
  })
  /*.state('app.single', {
    url: "/players/:playerId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  })*/;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/select-game');
});
