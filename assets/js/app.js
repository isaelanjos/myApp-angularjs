var app = angular.module('myApp', [
    'ngRoute',
    'ngMessages',
    'myApp.site',
    'myApp.author',
    'myApp.book',
    'angularUtils.directives.dirPagination'
]);

app.config(function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/site'});
});
