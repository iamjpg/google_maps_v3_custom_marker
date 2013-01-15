var PinWithLabelCollection;

PinWithLabelCollection = (function() {
	
	function PinWithLabelCollection(name) {
		this.name = name;
	}
	
	PinWithLabelCollection.prototype.collectionArray = [];
	
	PinWithLabelCollection.prototype.set = function(options) {
		this.map = options.map;
		this.collectionArray = options.collection;
		
		this.setEvents();
	}
	
	PinWithLabelCollection.prototype.setEvents = function() {
		
		_this = this;
		
		google.maps.event.addListener(this.map, 'idle', function() {

			_this.setProjection();
		
		});
		
		// Hide on Drag
		google.maps.event.addListener(this.map, 'dragstart', function() {
			
			if (document.getElementsByClassName("PinWithLabel")) {
				var _elements = document.getElementsByClassName("PinWithLabel");
				
				for (i = 0; i < _elements.length; i++) {
					_elements[i].style.display = 'none';
				}
			}
			
		});
		
		// Show again
		google.maps.event.addListener(this.map, 'dragend', function() {
			
			setTimeout(function() {
				if (document.getElementsByClassName("PinWithLabel")) {
					var _elements = document.getElementsByClassName("PinWithLabel");

					for (i = 0; i < _elements.length; i++) {
						_elements[i].style.display = 'block';
					}
				}
			}, 500);
			
			
		});
		
	}
	
	PinWithLabelCollection.prototype.setProjection = function() {
		
		var _this = this;
		
		_this.projection = _this.map.getProjection();
		_this.topRight = _this.projection.fromLatLngToPoint(_this.map.getBounds().getNorthEast()); 
		_this.bottomLeft = _this.projection.fromLatLngToPoint(_this.map.getBounds().getSouthWest()); 
		_this.scale = Math.pow(2,_this.map.getZoom());
		
		_this.print();
		
	}
	
	PinWithLabelCollection.prototype.print = function(_x, _y, _name) {
		
		_this = this;
		
		for (i = 0; i < _this.collectionArray.length; i++) {

			var _point = _this.projection.fromLatLngToPoint(
				new google.maps.LatLng(this.collectionArray[i].lat,this.collectionArray[i].lng)
			);
			
			var _posLeft = (_point.x - _this.bottomLeft.x) * _this.scale;
			var _posTop = (_point.y - _this.topRight.y) * _this.scale;
			
			if (!document.getElementById(this.collectionArray[i].name)) {

				var _div = document.createElement("div");
				_div.id = this.collectionArray[i].name;
				_div.className = "PinWithLabel";
				_div.style.position = "absolute";
				_div.style.width = "10px";
				_div.style.height = "10px";
				_div.style.background = "red";
				_div.style.color = "white";
				_div.style.zIndex = "10000";
				_div.style.left = _posLeft + "px";
				_div.style.top = _posTop + "px";

				document.body.appendChild(_div);
			} else {

				_div = document.getElementById(this.collectionArray[i].name);
				_div.style.left = _posLeft + "px";
				_div.style.top = _posTop + "px";
			}
		}
		
		
		
		
		
	}
	
	return PinWithLabelCollection;
	
})();