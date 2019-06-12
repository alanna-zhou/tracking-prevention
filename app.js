var express = require('express');
var app = express();
app.use(express.static('public'));
const hostname = '127.0.0.1';
var appRoot = process.cwd();
var cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // tells client that it is allowed to set these types of headers in the request
    next();
  });

  function prettyDate2(time){
    var date = new Date(parseInt(time));
    var localeSpecificTime = date.toLocaleTimeString();
    return localeSpecificTime.replace(/:\d+ /, ' ');
};

app.get('/', function(req, res, next) {
    var action = req.query.action;
    console.log("request.headers.host: " + req.headers.host);
    if (action == 'setcookie') {
        const cookieKeyAndVal = hostname+'='+prettyDate2(Date.now());
        res.setHeader('Set-Cookie', cookieKeyAndVal+ '; Path=/');
    }
 
    res.sendFile(appRoot + '/index.html');
});

app.get('/dummy', function(req, res, next) {
    res.json('dummy')
})

app.listen(3000, function() {
    console.log('listening on port 3000');
})
