var Map = function( latLng, zoom ) {
  // 'google' references the Google API. '.maps' and '.Map' are built-in properties of the API.
  this.googleMap = new google.maps.Map( document.getElementById( "map" ), {
    center: latLng,
     zoom: zoom,
     mapTypeId: google.maps.MapTypeId.HYBRID
  } );

this.resetCenter = function( latLngObj ) {
  this.googleMap.panTo( latLngObj )
};

this.addInfoWindow = function( latLng, title ) {
  var marker = this.addMarker( latLng, title );
  var infoWindow = new google.maps.InfoWindow( {
      content: title
  } )
  marker.addListener( "click", function() {
    infoWindow.open( this.map, marker );
  } )
};

this.addMarker = function( latLng, title ) {
  var marker = new google.maps.Marker( {
    position: latLng,
    map: this.googleMap,
    title: title
  } )
  return marker
};

}