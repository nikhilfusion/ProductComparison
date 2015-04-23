var Joi = require('joi'),
    fs = require('fs'),
    Request = require('request'),
    User = require('../model/user').User;

exports.upload = {
  validate: {
        payload: {

            output      :'stream',
            parse       : false,
            allow       : 'multipart/form-data',
            upload_file : Joi.object().required(),
            file_name   : Joi.string().required()
        }
  },
  handler: function (request, reply) {
    var upload_path = '../client/src/uploads/'+ request.payload.file_name;
    fs.writeFileSync(upload_path, request.payload['upload_file']);
    var user = new User({file_name : request.payload.file_name});
    user.save(function(err, user) {
      if (err) return reply(err);
      return reply("File uploaded succesfully");
    });
  }
};

exports.priceComaprison = {
  handler: function (request, reply) {
    Request('http://api.pricecheckindia.com/feed/product/' + request.params.category + '/' + request.params.product + '.json?user=kiranman&key=LALWDMKWIXEDLHAW', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        return reply(body);
      }
    })
  } 
};