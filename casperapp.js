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


var url = 'https://www.linkedin.com/';

casper.start(url, function() {
   this.echo("page loaded");
   this.test.assertExists('form#login', 'form is found');
   this.fill('form#login', { 
        ////////////////////////////////////////////////
        // Make sure to input username and pass below //
        ////////////////////////////////////////////////
        session_key: '', 
        session_password:  ''
    }, true);
});



var toEndorse = ['Java', 'JavaScript', 'Software Engineering'];


casper.thenOpen('https://www.linkedin.com/in/frankbowers', function(status){
  console.log(JSON.stringify(status));
  this.echo('INSIDE LINKEDIN PAGE');
  this.evaluate(function(toEndorse){
    console.log(this);
    skills = $('.endorsable');
    console.log(skills);
    for (var i=0; i<skills.length; i++){
      if(toEndorse.indexOf($(skills[i]).data('endorsedItemName')) > -1){
        $(skills[i]).find('.endorse-button')[0].click();
        console.log('Endorsed NAME for ' + $(skills[i]).data('endorsedItemName'));
      }
    }
  });
});



  // this.waitForSelector($('.endorsable'), function() {
  //   var skills = this.evaluate(function(){
  //     return $('.endorsable');
  //   });
  //   this.echo(skills);
  //   console.log(skills);
  // });




  // var skills = this.evalute(function(){
  //   return $('.endorsable');
  // });
  // console.log(JSON.strigify(skills));
  // for (var i=0; i<skills.length; i++){
  //   if(toEndorse.indexOf($(skills[i]).data('endorsedItemName')) > -1){
  //     $(skills[i]).find('.endorse-button')[0].click();
  //     console.log('Endorsed NAME for ' + $(skills[i]).data('endorsedItemName'));
  //   }
  // }
// });

casper.run();