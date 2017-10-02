"use strict";

var app = angular.module("myApp.site", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
        .when("/site", {
            templateUrl: "views/pages/home.html",
            controller: "siteCtrl"
        })
        .when("/help", {
            templateUrl: "views/pages/help.html",
            controller: "siteCtrl"
        })
        .when("/404", {
            templateUrl: "views/pages/404.html",
            controller: "siteCtrl"
        });


});

app.controller("siteCtrl", ['$scope', function($scope) {
    $scope.app = 'My App';
}]);