'use strict';
angular.module('project', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
    
    .when("/",    {templateUrl: "./frontend/html/chat.html"    , controller: "chatController"})
    .otherwise({
        redirectTo:'/'
      });

}]);




