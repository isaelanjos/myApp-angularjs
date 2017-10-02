var app = angular.module('myApp', [
    'ngRoute',
    'ngMessages',
    'myApp.site',
    'myApp.author',
    'angularUtils.directives.dirPagination'
]);

app.config(function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/site'});
});
