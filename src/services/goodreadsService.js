var http = require('http');
var xml2js = require('xml2js');
var parser = xml2js.Parser({explicitArray: false});

var goodreadsService = function() {
    function getBookById(id, callback) {
        var options = {
            host: 'www.goodreads.com',
            path: '/book/show/' + id + '?format=xml&key=aVZL6H1WyISMnEEsjj9jg'
        };
        
        var cb = function(response) {
          var str = '';
          response.on('data', function(chunk) {
             str += chunk; 
          });
          
          response.on('end', function() {
             console.log('Response String ' + str); 
             parser.parseString(str, function(error, result) {
                callback(null, result.GoodreadsResponse.book); 
             });
          });
        };
        
        //callback(null, {description: 'Our Desc'});
        
        http.request(options, cb).end();
    };
    
    return {
        getBookById: getBookById
    }
};

module.exports = goodreadsService;