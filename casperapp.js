var cred = require('./cred.js');


// DEFAULTS //
var casper = require('casper').create({   
  verbose: true, 
  logLevel: 'debug',
  pageSettings: {
    loadImages:  false,
    loadPlugins: false,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
  },
  waitTimeout: 15000
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


// DEFINE URLS FOR USERS TO ENDORSE AND SKILLS TO ENDORSE //
var userUrls = [];
var skillsToEndorse = [];

// NAVIGATE TO URLS AND ENDORSE //
for (var j=0; j<userUrls.length; j++){
  casper.wait(2000);
  casper.thenOpen(userUrls[j], function(thing){
    this.wait(8000);
    window.__flag = false;
  }).thenEvaluate(function(skillsToEndorse, userUrl){
    
    var connectionName = $('.full-name').text();

    //This function gathers buttons for all endorsable skills that match the toEndorse skills into an object
    //this is generalized into a function so it can be called with each recursive call to endorse
    var gatherEndorsables = function() {
      var unendorsed = {};
      var skills = $('.endorsable');
      for (var i=0; i<skills.length; i++){
        var skillName = $(skills[i]).data('endorsedItemName');
        if(skillsToEndorse.indexOf(skillName) > -1){
          unendorsed[skillName] = ($(skills[i]).find('.endorse-button')[0]);
        }
      }
      console.log('Gathering endorsables...');
      return unendorsed;
    }
    
    //This is a timed recursive function to click endorse buttons repeatedly every 3 seconds
    //until they're no longer endorsable (for some reason it can take a few tries)
    //The counter is currently set to try 5 times for a maximum of 15 seconds per user.
    var counter = 0;
    function endorse(unendorsed) {
      setTimeout(function () {
        console.log('Inside endorse function...');
        for (var skill in unendorsed){
          unendorsed[skill].click(function(thing){
            console.log('=========CLICKED====== ', thing);
          });
          delete unendorsed[skill];
        }
        counter++;
        unendorsed = gatherEndorsables();
        if (counter < 5 && Object.keys(unendorsed).length > 0) {
          endorse(unendorsed);
        } else {
          window.__flag = true;
        }
      }, 3000)
    }

    endorse(gatherEndorsables()); 

  }, skillsToEndorse, userUrls[j]).waitFor(function(){
    //This is a predicate function to keep track of endorsement success. It is only true
    //if all endorsements for a URL were made, or 5 attempts to endorse were tried. The script
    //waits for this predicate to be true in order to proceed to the next url.
    return this.getGlobal('__flag') === true;
  });
    
}


casper.run();
