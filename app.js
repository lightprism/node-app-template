var express = require("express");
var app = express();


app.get("/", function(req, res) {
   res.send("Sup"); 
});

app.get("/books", function(req, res) {
   res.send("Sup books"); 
});

app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Serving Up"); 
});


