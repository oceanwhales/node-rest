/* global angular */
var app = angular.module('chatClient', ['ngRoute']);

app.config(function($routeProvider) {
   $routeProvider
      .when('/', {
         controller: 'HomeController',
         templateUrl: 'views/home.html'
      })
      .when('/student-registration', {
         controller: 'FamillyController',
         templateUrl: 'views/studentRegistration.html'
      })
      .when('/login', {
         controller: 'LoginController',
         templateUrl: 'views/login.html'
      })
      .otherwise({
         redirectTo: '/'
      });
});