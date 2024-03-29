var _map;

$(document).ready(function() {
	
	// First init the map
	initMap();
	
	// Set custom Pin
	setCustomPin();
	
	google.maps.event.addListener(_map, 'click', function( event ){
	  console.log( "Latitude: "+event.latLng.lat()+" "+", longitude: "+event.latLng.lng() ); 
	});
	
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
	
	_pin_collection = new PinWithLabelCollection("First Collection");
	
	var _collection = [
		{
			name: "div1",
			label: 7155000,
			lat: 47.688729,
			lng: -122.286721
		},
		{
			name: "div2",
			label: 769000,
			lat: 47.6884438,
			lng: -122.287455
		},
		{
			name: "div3",
			status: "sold",
			label: 820000,
			lat: 47.68684970494409,
			lng: -122.28802442550659
		},
		{
			name: "div4",
			status: "open",
			label: 674950,
			lat: 47.68616356653837,
			lng: -122.27527856826782
		},
		{
			name: "div5",
			label: 649000,
			lat: 47.6859035538369,
			lng: -122.31576919555664
		}
	];
	
	_pin_collection.set({
		map: _map,
		collection: _collection
	});
	
	_pin_collection.setMapViewBasedOnCollection();
	
}