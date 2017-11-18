(function() {
  'use strict';

  angular.module('scrumboard.demo')
    .directive('scrumboardCard', CardDirective);

  // Add inputs for story points and business value

  function CardDirective() {
    return {
      templateUrl: '/static/html/card.html',
      restrict: 'E',
      controller: ['$scope', '$http', function ($scope, $http) {

        var url = '/scrumboard/cards/' + $scope.card.id + '/';
        $scope.destList = $scope.list;

        function removeCardFromList(card, list){
          var cards = list.cards;
          cards.splice(cards.indexOf(card), 1);
        }

        $scope.update = function () {
          return $http.put(url, $scope.card);
        }

        // this doesn't seem to work correctly.
        // instead, the list id is the previous select value
        $scope.move = function(destList) {
          if (destList===undefined) {
            return;
          }
          $scope.card.list = destList.id;
          $scope.update().then(function(){
            destList.cards.push($scope.card);
            removeCardFromList($scope.card, $scope.list);
          });
        }

        $scope.delete = function () {
          $http.delete(url).then(
            function () {
              removeCardFromList($scope.card, $scope.list);
            }
          );
        };

        $scope.modelOptions = {
          debounce: 2000
        };
      }]
    };
  }
})();
