var _map;

$(document).ready(function() {
	
	// First init the map
	initMap();
	
	// Set custom Pin
	setCustomPin();
	
});



var initMap = function () {
	
	var mapOptions = {
		center: new google.maps.LatLng(47.688729, -122.286721),
		zoom: 17,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	_map = new google.maps.Map(document.getElementById("map_div"), mapOptions);
	
}

var setCustomPin = function() {
	
	var _pin = new PinWithLabel("pin1");
	
	_pin.setMap(_map);
	_pin.setLat(47.688729);
	_pin.setLng(-122.286721);
	
	console.log(_pin);
	
}