var Request = require('request'),
	Cheerio = require('cheerio'),
	URL = 'http://www.junglee.com/mn/search/junglee/ref=nav_sb_noss?url=search-alias%3Delectronics&field-keywords='

exports.searchPrduct = {
	handler: function (request, reply) {
		Request({url:URL + request.params.product,
 		            headers:{'User-Agent':'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/533.4 (KHTML, like Gecko) Chrome/5.0.375.125 Safari/533.4'
            }}, function (error, response, html) {
            	if (!error && response.statusCode == 200) {
            		var sel = {};
            		var $ = Cheerio.load(html);
            		sel.product = eval("$(\".title\").text()");
            		sel.image = eval("$(\".faceout-image-anchor img\")");
            		sel.price = eval("$(\".price .product-whole-price\").text()");
            		console.log(sel.image);
                        for(var attribs in sel.image){
                              console.log(sel.image[attribs][src]);
                        }

            	}	
    	})
	}	
};
