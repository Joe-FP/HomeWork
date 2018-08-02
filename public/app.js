let beers;

const makeRequest = function(url, callback){
  //create a new XMLHttpRequest object
  const request = new XMLHttpRequest();
  //set the type of request we want with the url we want to call
  request.open("GET", url)
  //set the callback we want to use when the call is complete
  request.addEventListener('load', callback);
  //send the request
  request.send();
};

const requestComplete = function(){
  //this is the request object itself
  if(this.status !== 200) return;
  //grab the response text
  const jsonString = this.responseText;
  beers = JSON.parse(jsonString);
  populateDD(beers);
};

const populateDD = function(beers){
  let dropdown = document.getElementById('dd');
  dropdown.options.length = 0;
  let i = 0;
  beers.forEach(function(beer){
    let option = document.createElement("option");
    option.text = beer.name;
    option.value = i;
    dropdown.appendChild(option);
    i++;
  });
};

const handleDDSelect = function(){
  let dropdown = document.getElementById('dd');
  // Get value and text of selected DD option.
  let selectionID = dropdown.options[dropdown.selectedIndex].value;
  let selectionText = dropdown.options[dropdown.selectedIndex].text;
  // Get the beer object
  let beer = beers[selectionID];
  // Get and display beer name
  let name = document.getElementById('beer_name');
  name.innerText = beer.name;
  // Get and display beer ingredients
  let ingredients = document.getElementById('beer_ingredients');

  let hops = beer.ingredients.hops[0].name;
  let malt = beer.ingredients.malt[0].name;
  let yeast = beer.ingredients.yeast;

  ingredients.innerText = hops + " " + malt + " " + yeast;

  // Get and display beer image
  let img = document.getElementById('beer_pic');
  img.src = beer.image_url;
};

var app = function(){
  const url = 'https://api.punkapi.com/v2/beers';
  makeRequest(url, requestComplete);
  let dropdown = document.getElementById('dd');
  dropdown.addEventListener('change',handleDDSelect);
};

window.addEventListener('load', app);
