var app = angular.module('searchApp',[]);

app.controller('searchController',['$scope', '$http', 'CategoriesList', function($scope, $http, CategoriesList){
    $scope.init = function()
    {
        $scope.categories = CategoriesList.categories;
    }
    $scope.init();
    $scope.search = function(searchData)
	{
        var split = searchData.searchText.split(" ");
        var search = split[0];
        for(var i=1;i<split.length;i++)
        {
          search = search + '+' + split[i];
        }
      	//$http.get('http://api.pricecheckindia.com/feed/product/' + searchData.category + '/' + search + '.json?user=kiranman&key=LALWDMKWIXEDLHAW')
      	$http.get('priceComaprison/' + searchData.category + '/' + search)
        .success(function (data, status) {
            for(var i=0;i<data.product.length;i++)
            {
                if(searchData.searchText.toUpperCase() == data.product[i].brand.toUpperCase() + ' ' + data.product[i].model.toUpperCase())
                {    
                    $scope.search_dtls = data.product[i];
                }    
            }  
        });
	};
}]);


app.service('CategoriesList', [function () {
  this.categories=[];
  this.category = {
    mobile_phones: "Mobile Phones",
    tablets: "Tablets",
    landline_phones: "Landline Phones",
    mobile_bluetooth_head: "Mobile Bluetooth Headsets",
    mobile_headphone_head: "Mobile Headphone Headsets",
    mobile_batteries: "Mobile Batteries",
    mobile_chargers: "Mobile Chargers",
    mobile_memory: "Mobile Memory",
    point_shoots: "Point Shoots",
    camcorders: "Camcorders",
    dslrs: "Dslrs",
    binoculars_telescopes: "Binoculars Telescopes",
    digital_photo_frames: "digital_photo_frames",
    desktops: "desktops",
    laptops: "laptops",
    monitors: "monitors",
    printers_single: "printers_single",
    printers_multi: "printers_multi",
    scanners: "scanners",
    projectors: "projectors",
    lcd_tv: "lcd_tv",
    led_tv: "led_tv",
    plasma_tv: "plasma_tv",
    crt_tv: "crt_tv",
    home_theaters: "home_theaters",
    video_players: "video_players",
    speakers: "speakers",
    music_systems: "music_systems",
    gaming_consoles: "gaming_consoles",
    ipods: "ipods",
    mp3_players: "mp3_players",
    mp4_players: "mp4_players",
    washing_machines: "washing_machines",
    refrigerators: "refrigerators",
    air_conditioners: "air_conditioners",
    irons: "irons",
    water_purifiers: "water_purifiers",
    vacuum_cleaners: "vacuum_cleaners",
    microwave_ovens: "microwave_ovens",
    otg: "otg",
    induction_cooktops: "induction_cooktops",
    electric_cookers: "electric_cookers",
    mixer_grinder_juicer: "mixer_grinder_juicer",
    hand_blenders: "hand_blenders",
    food_processors: "food_processors",
    sandwich_makers: "sandwich_makers",
    popup_toasters: "popup_toasters",
    coffee_makers: "coffee_makers",
    electric_kettles: "electric_kettles",
    pen_drives: "pen_drives",
    external_hard_disks: "external_hard_disks",
    data_cards: "data_cards",
    routers: "routers",
    switches: "switches",
    processors: "processors",
    graphic_cards: "graphic_cards",
    rams: "rams",
    motherboards: "motherboards",
    tv_tuners: "tv_tuners",
    mouse: "mouse",
    keyboards: "keyboards",
    webcams: "webcams",
    laptop_batteries: "laptop_batteries",
    laptop_adapters: "laptop_adapters"
  }
  for(var key in this.category){
      this.categories.push({name:this.category[key],code:key})
  }
}]);