(function(){
  'use strict';

  angular.module('scrumboard.demo', ['ngRoute'])
    .controller('ScrumboardController', 
      ['$scope', '$http', '$location', 'Login', ScrumboardController]);

  function ScrumboardController($scope, $http, $location, Login) {

    $scope.add = function(list, title) {
      var card = {
        list: list.id,
        title: title
      };
      $http.post('/scrumboard/cards/', card)
        .then(function(response) {
          list.cards.push(response.data);
        },
        function() {
          console.log('Could not create card!');
        }
      );
    };

    Login.redirectIfNotLoggedIn();
    $scope.data = [];
    $scope.logout = Login.logout;
    $scope.sortBy = 'title';
    $scope.reverse = false;
    $scope.showFilters = false;

    $http.get('/scrumboard/lists/').then(function(response){
      $scope.data = response.data;
    });

  }
}());
