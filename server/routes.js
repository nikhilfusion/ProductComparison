// Load modules

var Product   = require('./controller/user'),
	Scrap 	  = require('./controller/scrap'),
    Static    = require('./static');

// API Server Endpoints
exports.endpoints = [

    { method: 'GET', path: '/{somethingss*}', config: Static.get },
    { method: 'GET', path: '/priceComaprisonV1/{product}', config: Product.priceComaprisonV1},
    { method: 'GET', path: '/priceComaprisonV2/{category}/{product}', config: Product.priceComaprisonV2},
    { method: 'GET', path: '/scrap/{product}', config: Scrap.searchPrduct}
];