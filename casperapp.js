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


// DEFAULT URL AND TO-ENDORSE SKILLS //
var skillsToEndorse = ['JavaScript', 'Javascript', 'MongoDB', 'Software Engineering', 'Node.js', 'Backbone.js'];
var userUrls = ['https://www.linkedin.com/pub/john-yeglinski/8/773/2b2', 'https://www.linkedin.com/in/kurtbartholomew', 'https://www.linkedin.com/in/frankbowers', 'https://www.linkedin.com/in/marktausch'];

// NAVIGATE TO URLS AND ENDORSE //
for (var j=0; j<userUrls.length; j++){
  casper.wait(2000);
  casper.thenOpen(userUrls[j], function(thing){
    this.wait(8000);
    window.__flag = false;
  }).thenEvaluate(function(skillsToEndorse, userUrl){
    
    var connectionName = $('.full-name').text();

    //gather buttons for all endorsable skills that match the toEndorse skills into an object
    var gatherEndorsables = function() {
      var unendorsed = {};
      var skills = $('.endorsable');
      for (var i=0; i<skills.length; i++){
        var skillName = $(skills[i]).data('endorsedItemName');
        if(skillsToEndorse.indexOf(skillName) > -1){
          unendorsed[skillName] = ($(skills[i]).find('.endorse-button')[0]);
        }
      }
      console.log('in gather endorsables ', unendorsed);
      return unendorsed;
    }
    
    //recursive function to click endorse buttons repeatedly until they're no longer endorsable (for some reason it takes a few tries)
    var counter = 1;
    function endorse(unendorsed) {
      setTimeout(function () {
        ('=========inside setTimeout endorse function====== ', unendorsed)
        for (var skill in unendorsed){
          unendorsed[skill].click(function(thing){
            console.log('=========CLICKED====== ', thing);
          });
          delete unendorsed[skill];
        }
        counter++;
        if (counter < 10 && Object.keys(unendorsed).length > 0) {
          endorse(gatherEndorsables());
        } else {
          window.__flag = true;
        }
      }, 3000)
    }
    endorse(gatherEndorsables()); 

  }, skillsToEndorse, userUrls[j]).waitFor(function(){
    return this.getGlobal('__flag') === true;
  });
    
}


casper.run();
