// Global namespace.
var PinWithLabelCollection;

// Closure
PinWithLabelCollection = (function() {
	
	// Object constructor
	function PinWithLabelCollection(name) {
		this.name = name;
	}
	
	// Array to hold onto custom pins
	PinWithLabelCollection.prototype.collectionArray = [];
	
	// Set options on the object
	PinWithLabelCollection.prototype.set = function(options) {
		this.map = options.map;
		this.collectionArray = options.collection;
		
		// Set the map events
		this.setEvents();
	}
	
	// Set Events method.
	PinWithLabelCollection.prototype.setEvents = function() {
		
		var _this = this;
		
		google.maps.event.addListener(this.map, 'idle', function() {

			_this.setProjection();
		
		});
		
		// Hide on Drag
		google.maps.event.addListener(this.map, 'dragstart', function() {
			
			if (document.getElementsByClassName("PinWithLabelCollection")) {
				var _elements = document.getElementsByClassName("PinWithLabelCollection");
				
				for (i = 0; i < _elements.length; i++) {
					_elements[i].style.visibility = 'hidden';
				}
			}
			
		});
		
		// Show again
		google.maps.event.addListener(this.map, 'dragend', function() {
			
			setTimeout(function() {
				if (document.getElementsByClassName("PinWithLabelCollection")) {
					var _elements = document.getElementsByClassName("PinWithLabelCollection");

					for (i = 0; i < _elements.length; i++) {
						_elements[i].style.visibility = 'visible';
					}
				}
			}, 500);
			
			
		});
		
	}
	
	// Set the map projection to calculate lat/lng to pixel x,y
	PinWithLabelCollection.prototype.setProjection = function() {
		
		var _this = this;
		
		_this.projection = _this.map.getProjection();
		_this.topRight = _this.projection.fromLatLngToPoint(_this.map.getBounds().getNorthEast()); 
		_this.bottomLeft = _this.projection.fromLatLngToPoint(_this.map.getBounds().getSouthWest()); 
		_this.scale = Math.pow(2,_this.map.getZoom());
		
		// Print the pins
		_this.print();
		
	}
	
	// Print the pins
	PinWithLabelCollection.prototype.print = function(_x, _y, _name) {
		
		var _this = this;
		
		// Loop over the array and print to the screen
		for (i = 0; i < _this.collectionArray.length; i++) {
			
			// Get point value based on the current map projection
			var _point = _this.projection.fromLatLngToPoint(
				new google.maps.LatLng(this.collectionArray[i].lat,this.collectionArray[i].lng)
			);
			
			var _posLeft = (_point.x - _this.bottomLeft.x) * _this.scale;
			var _posTop = (_point.y - _this.topRight.y) * _this.scale;
			
			// If the div has not been added to the DOM - create!
			if (!document.getElementById(this.collectionArray[i].name)) {
				
				var _class_name = this.collectionArray[i].class_name;
				
				// Create divs
				var _div = document.createElement("div");
				var _div_label = document.createElement("div");
				var _div_price = document.createElement("div");
				
				// Container styling
				_div.id = this.collectionArray[i].name;
				_div.className = "PinWithLabelCollection";
				_div.style.left = _posLeft + "px";
				_div.style.top = _posTop + "px";
				
				// Label styling
				if (_this.collectionArray[i].status && _this.collectionArray[i].status !== "active") {
					
					_div_label.className = "label" + " " + _this.collectionArray[i].status
					
					_div_label.innerHTML = _this.collectionArray[i].status;
				}
				
				// Price styling
				_div_price.className = "price";
				_div_price.innerHTML = this.collectionArray[i].label;
				
				// Conditionally add label
				if (_div_label) {
					_div.appendChild(_div_label);
				}
				
				// Add price
				_div.appendChild(_div_price);
				
				// Append to the DOM
				document.getElementById("map_div").appendChild(_div);
			} else {

				_div = document.getElementById(this.collectionArray[i].name);
				_div.style.left = _posLeft + "px";
				_div.style.top = _posTop + "px";
			}
		}
		
	}
	
	PinWithLabelCollection.prototype.setMapViewBasedOnCollection = function() {
		var i, loc, markerBounds, o;
		var _this = this;
		if (this.collectionArray.length > 1) {
			markerBounds = new google.maps.LatLngBounds();
			i = 0;
			while (i < this.collectionArray.length) {
				o = this.collectionArray[i];
				if (o.lat != null) {
					loc = new google.maps.LatLng(parseFloat(o.lat), parseFloat(o.lng));
					markerBounds.extend(loc);
				}
				i++;
			}
			return _this.map.fitBounds(markerBounds);
		} else {
			o = this.collectionArray[0];
			if (o) {
				return this.centerAndZoom(o.lat, o.lng, 17);
			}
		}
	}
	
	return PinWithLabelCollection;
	
})();