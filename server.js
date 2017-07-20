var https = require('https');
var qs = require('querystring');
var express = require("express");
var path=require('path');
var app = express();
server  = require('http').Server(app);
app.set('views',__dirname);    // config view 
app.set('view engine', 'html'); 
app.engine( '.html', require( 'ejs' ).__express );
var context = {};
getAccessToken(context);
setInterval(getAccessToken, 7100 * 1000, context);
require('./index')(app);      //router config file
server.listen(80,function(){
console.log('App start,port 80.');
});

function getAccessToken(context) {
  var data = {
    grant_type: "client_credential",
    appid: "wx06b3b86f63137f4f",
    secret: "15faf94a01a96db4567af88de17ae998"
  };
  
  var content = qs.stringify(data);
  var url = "https://api.weixin.qq.com/cgi-bin/token?" + content;

  https.get(url, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);
  
    res.on('data', (d) => {
      console.log(d);
      //process.stdout.write(d);
      var result = JSON.parse(d);
      console.log("access token:", result.access_token);
    });
  
  }).on('error', (e) => {
    console.error(e);
  });
};
