app.controller('scrapController',['$scope', '$http', '$location', function($scope, $http, $location){

	$scope.search = function(searchData)
	{
		console.log(searchData);
		$http.get('/scrap/' + searchData)
		.success(function(searchDtls, status) {
			console.log(searchDtls);
		})
		.error( function(data, status, headers, config) {
			console.log("data",data);
		});
	};

}]);