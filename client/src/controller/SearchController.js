app.controller('searchController',['$scope', '$http', 'CategoriesList', '$location', function($scope, $http, CategoriesList, $location){
    $scope.init = function()
    {
        $scope.categories = CategoriesList.categories;
    }
    $scope.init();
    $scope.found = true;
    $scope.search = function(searchData)
	{
        if(searchData)
        {
            console.log(searchData);
            alert(searchData)

            var split = searchData.searchText.split(" ");
            var search = split[0];
            for(var i=1;i<split.length;i++)
            {
              search = search + '+' + split[i];
            }
          	$http.get('priceComaprisonV1/' + search)
            .success(function (productDtls, status) {
                $scope.dtls = [];
                for(var i=0;i<productDtls.data.length;i++)
                {
                    if(productDtls.data[i].available_price)
                    {    
                        productDtls.data[i].available_price = parseInt(productDtls.data[i].available_price);
                        $scope.dtls.push(productDtls.data[i]);
                    }    
                }
            })
            .error(function(data, status, headers, config) {
                $scope.dtls = [];
            });
        }
        else
        {
            $scope.found = false; 
        }    
	};

    $scope.show_details = function(url)
    {
        window.open(url,'_blank')
    };

    $scope.searchVersion2 = function(searchData)
    {
  
        $scope.searchbtn = true; 
        var split = searchData.searchText.split(" ");
        var search = split[0];
        for(var i=1;i<split.length;i++)
        {
          search = search + '+' + split[i];
        }
        $http.get('priceComaprisonV2/' + searchData.category + '/' + search )
        .success(function (data, status) {
            console.log("data",data);
            if(data)
            {    
                $scope.found = true;
                if(data.product.length == 1)
                {
                    $scope.prod_list = true;
                    $scope.search_dtls = data.product[0];
                    console.log("$scope.search_dtls",$scope.search_dtls);
                }   
                else
                {
                    $scope.productDtls = [];
                    $scope.prod_list = false;
                    for(var i=0; i<data.product.length;i++)
                    {
                        $scope.productDtls[i] = {brand:"",model:"",image:""};
                        $scope.productDtls[i].brand = data.product[i].brand;
                        $scope.productDtls[i].model = data.product[i].model;
                        for(var j=0; j<data.product[i].stores.length; j++) 
                        {
                            if(data.product[i].stores[j].image)
                            {
                                $scope.productDtls[i].image = data.product[i].stores[j].image;
                            }    
                        }    
                    }    
                }
            }
            else
            {
                $scope.found = false;
            }    
        });
    };

    $scope.productClick = function(data)
    {
        $scope.search.searchText = data.brand + " " + data.model;
        var searchPdct = data.brand + "+";
        var split = data.model.split(" ");
        var search = split[0];
        for(var i=1;i<split.length;i++)
        {
          search = search + '+' + split[i];
        }
        $http.get('priceComaprisonV2/' + $scope.search.category + '/' + searchPdct + search )
        .success(function (data, status) {
            if(data)
            {    
                $scope.found = true;
                if(data.product.length == 1)
                {
                    $scope.prod_list = true;
                    $scope.search_dtls = data.product[0];
                    console.log("$scope.search_dtls",$scope.search_dtls);
                }   
                else
                {
                    $scope.productDtls = [];
                    $scope.prod_list = false;
                    for(var i=0; i<data.product.length;i++)
                    {
                        $scope.productDtls[i] = {brand:"",model:"",image:""};
                        $scope.productDtls[i].brand = data.product[i].brand;
                        $scope.productDtls[i].model = data.product[i].model;
                        for(var j=0; j<data.product[i].stores.length; j++) 
                        {
                            if(data.product[i].stores[j].image)
                            {
                                $scope.productDtls[i].image = data.product[i].stores[j].image;
                            }    
                        }    
                    }    
                }
            }
            else
            {
                $scope.found = false;
            }  
        });
    };

}]);