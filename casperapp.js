var cred = require('./cred.js');


// DEFAULTS //
var casper = require('casper').create({   
  verbose: true, 
  logLevel: 'debug',
  pageSettings: {
    loadImages:  false,
    loadPlugins: false,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
  }
});


// PRINT OUT ALL MESSAGES IN HEADLESS BROWSER CONTEXT (for debugging) //
casper.on('remote.message', function(msg) {
    this.echo('remote message caught: ' + msg);
});
casper.on("page.error", function(msg, trace) {
    this.echo("Page Error: " + msg, "ERROR");
});

// LOG IN LOGIC //
casper.start('http://linkedin.com');
casper.wait(1000, function(){
  casper.then(function() {
   this.echo("page loaded");
   this.test.assertExists('form#login', 'form is found');
   this.fill('form#login', { 
        'session_key': cred.username, 
        'session_password': cred.password
    }, true);
  })
});

casper.wait(1000);

// DEFAULT URL AND TO-ENDORSE SKILLS //
var toEndorse = ['Java', 'JavaScript', 'Software Engineering', 'D3.js'];
var userUrl = 'https://www.linkedin.com/in/frankbowers';

// NAVIGATE TO URL AND ENDORSE //
casper.thenOpenAndEvaluate(userUrl, function(toEndorse, userUrl){
  var skills = $('.endorsable');
  for (var i=0; i<skills.length; i++){
    if(toEndorse.indexOf($(skills[i]).data('endorsedItemName')) > -1){
      $(skills[i]).find('.endorse-button')[0].click();
      console.log('Endorsed ' + userUrl + ' for ' + $(skills[i]).data('endorsedItemName'));
    }
  }
}, toEndorse, userUrl);

casper.run();