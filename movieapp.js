var app = angular.module('movie-app', ['ngRoute']);
//routes to two different pages
app.config(function($routeProvider){
  $routeProvider
  .when('/', {
    controller: 'MainController',
    templateUrl: 'main.html'
  })
  .when('/:movieId', {
    controller: 'DetailsController',
    templateUrl: 'details.html'
  });

});

app.controller('MainController', function($scope, $http) {
  $http.get('http://api.themoviedb.org/3/movie/now_playing?api_key=fec8b5ab27b292a68294261bb21b04a5')
  .success(function(data) {
    $scope.data = data;
    console.log(data);


  });
  //when the more button is clicked show more movies
  var page = 2;
  $scope.getMoreMovies = function() {
    $http.get('http://api.themoviedb.org/3/movie/now_playing?api_key=fec8b5ab27b292a68294261bb21b04a5&page=' + page)
    .success(function(data) {
      $scope.data = data;
      console.log(data);
      //console.log(data.total_pages)
      if(page <= data.total_pages) {
        page++;
      };
    });
  };
  //search for movies when search is clicked
  $scope.searchMovies = function() {
    $http.get("http://api.themoviedb.org/3/search/movie?api_key=fec8b5ab27b292a68294261bb21b04a5&query=" + $scope.searchMovie)
    .success(function(data){
      $scope.data = data;
    });
  };

});

app.controller('DetailsController', function($scope, $routeParams, $http) {
  $scope.movieId = $routeParams.movieId;
  $http.get('http://api.themoviedb.org/3/movie/' + $routeParams.movieId + '?api_key=fec8b5ab27b292a68294261bb21b04a5')
  .success(function(resp) {
    $scope.resp = resp;
    console.log(resp);
  });
});
