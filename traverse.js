//import username and pass for linkedin

//start at http://linkedin.com, enter credentials, wait until loaded



//endorse function takes two arrays: [urls], [skills]
var endorse = function(toEndorse){
  var skills = $('.endorsable');
  for (var i=0; i<skills.length; i++){
    if(toEndorse.indexOf($(skills[i]).data('endorsedItemName')) > -1){
      $(skills[i]).find('.endorse-button')[0].click();
      console.log('Endorsed NAME for ' + $(skills[i]).data('endorsedItemName'));
    }
  }
}
