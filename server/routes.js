// Load modules

var Product      = require('./controller/user'),
    Static    = require('./static');

// API Server Endpoints
exports.endpoints = [

    { method: 'GET',  path: '/{somethingss*}', config: Static.get },
    { method: 'GET', path: '/priceComaprison/{category}/{product}', config: Product.priceComaprison}
];