var http = require("http");
var fs = require("fs");
var extract = require("./extract");
var wss = require("./websockets-server");

var handleError = function(err, res) {
  fs.readFile("app/error.html", function(err, text) {
    console.log("data: " + text);
    res.writeHead(404);
    res.end(text);
  });
};

var server = http.createServer(function(req, res) {
  console.log("Responding to a request.");

  /* UPDATED TO READ CONTENT FROM FILE INSTEAD OF JS FILE */
  //res.end("<h1>Hello, World!!<h1>");

  var filePath = extract(req.url);
  fs.readFile(filePath, function(err, data) {

    if (err) {
      handleError(err, res);
      return;
    } else {
      res.end(data);
    }
  });
});
server.listen(3000);
