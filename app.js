var traverse = require('utils');
var page = require('webpage').create();

var urls = ['https://www.linkedin.com/in/frankbowers'];
var username = 'zacharyrobert@gmail.com';
var password = 'Buy me a burrito.';
var skills = ['Software Engineering, Java, JavaScript, Node.js']

page.open('http://www.linkedin.com', function() {
  console.log('at linkedin');
  page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
    utils.logIn(username, password)
  }
  urls.forEach(function(url){
    page.open(url, function(){
      page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
        page.evaluate(function() {
          utils.endorse(skills);
        });
      })
    })
  })
  phantom.exit()
});