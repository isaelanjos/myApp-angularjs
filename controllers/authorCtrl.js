"use strict";

var app = angular.module("myApp.author", ["ngRoute"]);
var baseUrl = 'http://libraryapp-alezio.rhcloud.com/api/authors/';

app.config(function($routeProvider) {
    $routeProvider
        .when("/authors", {
            templateUrl: "views/author/list.html",
            controller: "authorListCtrl"
        }).when("/authors/create", {
            templateUrl: "views/author/create.html",
            controller: "authorCreateCtrl"
        }).when("/authors/detail/:id", {
            templateUrl: "views/author/detail.html",
            controller: "authorDetailCtrl"
        }).when("/authors/update/:id", {
            templateUrl: "views/author/update.html",
            controller: "authorUpdateCtrl"
        });
});

app.controller('authorListCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.title = "Authors: List";
    $scope.list;
    var getItems = function () {
        $http.get(baseUrl).then(function(response) {
            $scope.list = response.data;
            console.log($scope.list);
        }, function(err) {
            console.log(err);
        });
        $scope.sort = function(keyname){
            $scope.sortKey = keyname;
            $scope.reverse = !$scope.reverse;
        };
    };

    $scope.deleteItem = function (idItem) {
        var result = confirm("Are you sure you want to delete this?");
        if (result) {
            $http.delete(baseUrl+idItem).then(function(response) {
                getItems();
            }, function(err) {
                console.log(err);
            });
        }
    };

    $scope.go = function (path) {
        console.log(path);
        return;
        location.href = path;
    };

    getItems();
}]);

//Create
app.controller('authorCreateCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.title = "Authors: Create Form";
    $scope.createAuthor = function (formData) {
    $http.post(baseUrl, formData).then(function(response) {
        alert("Saved item successfully!");
        location.href = "#authors";
        }, function(err) {
        console.log(err);
    });
    };
}]);

//Details, Books by Authors, Add Book to Author
app.controller('authorDetailCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    $scope.title = "Authors: Details";
    $scope.routeParams = $routeParams;
    $scope.data;
    $scope.books;

    var getAuthor = function (idAuthor) {
        $http.get(baseUrl+idAuthor).then(function(response) {
            $scope.data = response.data;
        }, function(err) {
            console.log(err);
        });
    }
    
    var getBooks = function (idAuthor) {
        $http.get(baseUrl+idAuthor+'/books').then(function(response) {
            $scope.books = response.data;
            console.log($scope.books);
        }, function(err) {
            console.log(err);
        });
        $scope.sort = function(keyname){
            $scope.sortKey = keyname;
            $scope.reverse = !$scope.reverse;
        };
    }

    $scope.addBook = function (idAuthor, formData) {
        $http.post(baseUrl+idAuthor+'/books',formData).then(function(response) {
            alert("Saved item successfully!");
            location.href = "#authors/detail/"+idAuthor;
        }, function(err) {
            console.log(err);
        });
    };

    $scope.deleteBook = function (idAuthor,idBook) {
        var result = confirm("Are you sure you want to delete this?");
        if (result) {
            $http.delete(baseUrl+idAuthor+'/books/'+idBook).then(function(response) {
                getBooks(idAuthor);
            }, function(err) {
                console.log(err);
            });
        }
    };

    getAuthor($scope.routeParams.id);
    getBooks($scope.routeParams.id);
}]);

//Update
app.controller('authorUpdateCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    $scope.title = "Authors: Update Form";
    $scope.routeParams = $routeParams;

    var getAuthor = function (idAuthor) {
        $http.get(baseUrl+idAuthor).then(function(response) {
            $scope.form = response.data;
        }, function(err) {
            console.log(err);
        });
    }
    
    $scope.saveAuthor = function (formData) {
        $http.put(baseUrl+formData.id, formData).then(function(response) {
            delete $scope.form;
            alert("Saved item successfully!");
            location.href = "#authors";
        }, function(err) {
            console.log(err);
        });
    }

    getAuthor($scope.routeParams.id);

}]);