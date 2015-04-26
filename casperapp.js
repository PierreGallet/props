var cred = require('./cred.js');

var casper = require('casper').create({   
  verbose: true, 
  logLevel: 'debug',
  pageSettings: {
    loadImages:  false,         // The WebPage instance used by Casper will
    loadPlugins: false,         // use these settings
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
  }
});

// print out all the messages in the headless browser context
casper.on('remote.message', function(msg) {
    this.echo('remote message caught: ' + msg);
});

// print out all the messages in the headless browser context
casper.on("page.error", function(msg, trace) {
    this.echo("Page Error: " + msg, "ERROR");
});

//navigate to linkedin.com and log in
casper.start('http://linkedin.com');
casper.wait(1000, function(){
  casper.then(function() {
   this.echo("page loaded");
   this.test.assertExists('form#login', 'form is found');
   this.fill('form#login', { 
        ////////////////////////////////////////////////
        // Make sure to input username and pass below //
        ////////////////////////////////////////////////
        'session_key': cred.username, 
        'session_password': cred.password
    }, true);
  })
});

casper.wait(1000);

//default skills and user url to endorse for testing
var toEndorse = ['Java', 'JavaScript', 'Software Engineering'];
var userUrl = 'https://www.linkedin.com/in/frankbowers';

//navigate to user url
casper.thenOpenAndEvaluate(userUrl, function(toEndorse, userUrl){
  var skills = $('.endorsable');
  //if endorsables are in toEndorse list, click the endorse button
  for (var i=0; i<skills.length; i++){
    if(toEndorse.indexOf($(skills[i]).data('endorsedItemName')) > -1){
      $(skills[i]).find('.endorse-button')[0].click();
      console.log('Endorsed ' + userUrl + ' for ' + $(skills[i]).data('endorsedItemName'));
    }
  }
}, toEndorse, userUrl);

casper.run();