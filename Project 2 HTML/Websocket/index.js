var express = require('express');

// App setup
var app = express();
var server= app.listen(4000, function(){
    console.log('listening on port 4000')
})