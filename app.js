var traverse = require('utils');
var page = require('webpage').create();

var urls;
var username;
var password;
var skills = ['Software Engineering, Java, JavaScript, Node.js']

console.log(urls);

page.open('http://www.linkedin.com', function() {
  console.log('at linkedin');
  page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
    utils.logIn(username, password)
    console.log('logged in');
  }
  urls.forEach(function(url){
    page.open(url, function(){
      console.log('opened url: ', url);
      page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
        page.evaluate(function() {
          utils.endorse(skills);
        });
      })
    })
  })
  phantom.exit()
});