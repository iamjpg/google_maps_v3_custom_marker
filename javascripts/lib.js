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
	
	var _pin_collection = new PinWithLabelCollection("First Collection");
	
	var _collection = [
		{
			name: "div1",
			class_name: "custom_pin active",
			label: "500k",
			lat: 47.688729,
			lng: -122.286721
		},
		{
			name: "div2",
			class_name: "custom_pin sold",
			label: "650k",
			lat: 47.6884438,
			lng: -122.287455
		}
	];
	
	_pin_collection.set({
		map: _map,
		collection: _collection
	});
	
	console.log(_pin_collection);
	
}