//Utility functions for all interactions on the page

var logIn = module.exports = function(username, password){
  $('#session_key-login').val(username);
  //TODO:check syntax for password string -- sometimes fails, maybe b/c it's a string?
  $('#session_password-login').val(password);
  setTimeout(function(){ $('#signin').click(); }, 1000);
}

var endorse = module.exports = function(toEndorse){
  var skills = $('.endorsable');
  for (var i=0; i<skills.length; i++){
    if(toEndorse.indexOf($(skills[i]).data('endorsedItemName')) > -1){
      $(skills[i]).find('.endorse-button')[0].click();
      console.log('Endorsed NAME for ' + $(skills[i]).data('endorsedItemName'));
    }
  }
}

exports = {
  logIn,
  endorse
};