// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.just-eat.co.uk/restaurants*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

   var restaurants = $.find("[itemprop*='name']");
   var postCodes = $.find("[itemprop*='postalCode']");
   console.log(restaurants);
   for(var r in restaurants){
     var name = restaurants[r].innerText;
     var postCode = postCodes[r].innerText;
     var json =  JSON.parse(curl(name,postCode));
     var notFoundUrl= "<img src=\"http://coastalurgentcarelouisiana.com/wp-content/uploads/2015/07/food-poisoning.png\"></img>";
     var rating = json.establishments.length > 0 && json.establishments[0].RatingValue;
     var ratingUrl = rating ? "<img src=\"http://ratings.food.gov.uk/images/scores/medium/fhrs_"+ rating +"_en-gb.JPG\"></img>" : notFoundUrl;
     //restaurants[r].innerText = name + " RATING: "+ rating;
     $(restaurants[r]).after(ratingUrl);
     console.log(restaurants[r].innerText);
   } 
   //var name = "ichiban%20sushi";
   //var result = JSON.parse( curl(name));
   //console.log(result);
   //console.log(result.establishments[0].RatingValue);

    function curl(name, postCode) {
      var xhr = new XMLHttpRequest();
      xhr.open('get', 'http://api.ratings.food.gov.uk/Establishments?name='+encodeURI(name)+'&address='+ encodeURI(postCode), false);
      xhr.setRequestHeader("accept","application\/json");
      xhr.setRequestHeader("x-api-version","2");

      xhr.send();
      return xhr.responseText;
    }

})();