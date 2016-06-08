window.onload = function() {
  var url = "https://restcountries.eu/rest/v1"
  var request = new XMLHttpRequest();
  request.open( "GET", url )

  request.onload = function() {
    if( request.status === 200 ) {
      var jsonString = request.responseText;
      var countries = JSON.parse( jsonString );
      main( countries );
    }
  }
  request.send( null )
}

var main = function( countries ) {

  var map = new Map( {lat: 55.9484912, lng: -3.1996179}, 4 )

  populateSelect( countries, map );
  var selected = countries[0];
  //If there is nothing in local storage, 'cached' will be null, which is falsey.
  var cached = localStorage.getItem( "selectedCountry" );

  if( cached ) {
    selected = JSON.parse( cached );
    document.querySelector( "#countries" ).selectedIndex = selected.index;
    console.log( selected );
    var center = {lat: selected.latlng[0], lng: selected.latlng[1]}
    map.resetCenter( center )
    updateDisplay( selected, map );
  }

  
  //This will make div 'info' visible, as display is set to 'none' in index.html.
  document.querySelector( "#info" ).style.display = "block";
}

var populateSelect = function( countries, map ) {
  var parent = document.querySelector( "#countries" );
  countries.forEach( function( item, index ) {
    item.index = index;
    var option = document.createElement( "option" )
    option.value = index;
    option.innerText = item.name;
    parent.appendChild( option );
  } );
  parent.style.display = "block";
  parent.map = map;
  parent.addEventListener( "change", function(event){
    var index = event.target.value;
    console.log( index );
    console.log(event)
    var country = countries[index];
    
    localStorage.setItem( "selectedCountry", JSON.stringify( country ) );
    updateDisplay( country, this.map );
  } );
}

var updateDisplay = function( country, map ) {
  var name = country.name;
  var pop = country.population;
  var cap = country.capital;
  var infoText = name + " -- Capital: " + cap + " -- Population: " + pop

  var center = {lat: country.latlng[0], lng: country.latlng[1]}
  map.resetCenter( center )
  map.addInfoWindow( center, infoText );
};