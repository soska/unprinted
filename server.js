var http = require("http");
var url = require("url");
var path = require("path");
var fs = require("fs");
var request = require('request');
var port = process.argv[2] || 3000;

http.createServer(function(req, res) {

  var uri = url.parse(req.url).pathname;
  
  var filename = path.join(process.cwd(), uri);
  var route = uri.match(/\/samples\/([a-z]+)$/);
  if (route) {
    filename = process.cwd() + '/samples/' + route[1] + '.html';
  }

  console.log('request: ' + uri + " | " + filename);
  
  fs.exists(filename, function(exists) {

    if(!exists) {
      fs.readFile("./reader.html", "binary", function(err, file) {
        if(err) {
          res.writeHead(500, {"Content-Type": "text/plain"});
          res.write(err + "\n");
        } else {
          res.writeHead(200);
          res.write(file, "binary");
        }
        res.end();
      });
    } else {
      if (fs.statSync(filename).isDirectory()) filename += '/index.html';

      fs.readFile(filename, "binary", function(err, file) {
        if(err) {
          res.writeHead(500, {"Content-Type": "text/plain"});
          res.write(err + "\n");
        } else {
          res.writeHead(200);
          res.write(file, "binary");
          console.log('response: ' + filename);
        }
        res.end();
      });
    }
  });

}).listen(parseInt(port, 10));



console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");
