var traverse = require('utils');
var page = require('webpage').create();

page.open('http://www.linkedin.com', function() {
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