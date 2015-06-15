angular.module('starter.controllers', [])
.run(function() {
    //$rootScope.loginData = 'init';
})
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

 // $scope.game = {};

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);


  /*var ref = new Firebase("https://glaring-torch-2223.firebaseio.com/messages");
  // create a synchronized array
  $scope.messages = $firebaseArray(ref);
  // add new items to the array
  // the message is automatically added to our Firebase database!
  $scope.addMessage = function() {
    $scope.messages.$add({
      text: $scope.newMessageText
    });
  };*/


  };
})

.controller('GameCtrl', function($scope, $state, $ionicSlideBoxDelegate, $ionicPopup, $firebaseObject) {
  $scope.players = [
    { username: 'Reggae', id: 1 },
    { username: 'Chill', id: 2 },
    { username: 'Dubstep', id: 3 },
    { username: 'Indie', id: 4 },
    { username: 'Rap', id: 5 },
  ];

  $scope.hostGame = function() {
    //console.log('host-game',$scope.loginData);
    //$location.path('/host-game');
    if (!$scope.loginData.username) {
      $scope.login();
    } else {

      var gameID = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);  
      var gameSession = "g"+gameID;     
      var ref = new Firebase("https://glaring-torch-2223.firebaseio.com/"+gameSession);

      var syncObject = $firebaseObject(ref); 
        
      syncObject.$bindTo($scope, gameSession);
      console.log(gameSession);
      $scope[gameSession] = {gid: gameID};

      console.log('c:'+$scope[gameSession].gid);
      $state.go('app.host-game');      
    }
  };
  $scope.joinGame = function() {
    //console.log('join-game',$scope.loginData);
    //$location.path('/host-game');
    if (!$scope.loginData.username) {
      $scope.login();
    } else {
      $state.go('app.join-game');
    }
  };
  $scope.data = {
    numViewableSlides : 0,
    slideIndex : 0,
    initialInstruction : true,
    secondInstruction : false,
    question : { 'src' : 'assets/pt-br/cards/question-card-0-1.jpg'},
    answers : [
    {
      'id' : 1,
      'src' : 'assets/pt-br/cards/answer-card-0-1.jpg',
      'viewable' : true,
      'selected' : false
    },

    {
      'id' : 2,
      'src' : 'assets/pt-br/cards/answer-card-0-2.jpg',
      'viewable' : false,
      'selected' : false
    },
    
    {
      'id' : 3,
      'src' : 'assets/pt-br/cards/answer-card-0-3.jpg',
      'viewable' : true,
      'selected' : false
    },

    {
      'id' : 4,
      'src' : 'assets/pt-br/cards/answer-card-0-4.jpg',
      'viewable' : true,
      'selected' : false
    }
  ]
  };
  
  /*var countSlides = function() {
    $scope.data.numViewableSlides = 0;
    
    _.forEach($scope.data.cards, function(card) {
      if(card.viewable === true) $scope.data.numViewableSlides++;
    })
    
    console.log($scope.data.numViewableSlides + " viewable slides");
    
  }*/
  
  //countSlides();
  
  // Called to navigate to the main app
  //$scope.startApp = function() {
  //  $state.go('main');
  //};
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };
  
  /*$scope.showBonus = function() {
    var index = _.findIndex($scope.data.cards, { template : 'bonusSlide.html' });
    $scope.data.cards[index].viewable = true;
    countSlides();
    $scope.data.initialInstruction = false
    $scope.data.secondInstruction = true;

    $ionicSlideBoxDelegate.update();
  };*/

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    
    $scope.data.slideIndex = index;
  };
  
  // A confirm dialog
  $scope.showConfirm = function(id) {
    var confirmPopup = $ionicPopup.confirm({
       title: 'Use this answer ?'
    });
    confirmPopup.then(function(res) {
      var state = res;
      for (i=0;i<$scope.data.answers.length;i++) {
        if ($scope.data.answers[i].id == id) {
          $scope.data.answers[i].selected = state;
        } else {
          $scope.data.answers[i].selected = ($scope.data.answers[i].selected) ? true : false;
        }
      }       
     });
   };

   $scope.numAnswers = function() {
      for (i=0;i<$scope.data.answers.length;i++) {
        if ($scope.data.answers[i].selected) {
          return true;
        }
      }
      return false;
   }

});
