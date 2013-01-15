var PinWithLabel;

PinWithLabel = (function() {
	
	function PinWithLabel(name) {
		this.name = name;
	}
	
	PinWithLabel.prototype.setLat = function(lat) {
		this.lat = lat;
	}
	
	PinWithLabel.prototype.setLng = function(lng) {
		this.lng = lng;
	}
	
	PinWithLabel.prototype.setMap = function(map) {
		
		var _this = this;
		
		this.map = map;
		
		google.maps.event.addListener(map, 'idle', function() {

			_this.setProjection()
			_this.print();
		
		});
		
		// Hide on Drag
		google.maps.event.addListener(map, 'dragstart', function() {
			
			if (document.getElementsByClassName("PinWithLabel")) {
				var _elements = document.getElementsByClassName("PinWithLabel");
				
				for (i = 0; i < _elements.length; i++) {
					_elements[i].style.display = 'none';
				}
			}
			
		});
		
		// Show again
		google.maps.event.addListener(map, 'dragend', function() {
			
			setTimeout(function() {
				if (document.getElementsByClassName("PinWithLabel")) {
					var _elements = document.getElementsByClassName("PinWithLabel");

					for (i = 0; i < _elements.length; i++) {
						_elements[i].style.display = 'block';
					}
				}
			}, 250);
			
			
		});
	}
	
	PinWithLabel.prototype.setProjection = function() {
		
		var _this = this;
		
		var _projection = _this.map.getProjection();
		var _topRight = _projection.fromLatLngToPoint(_this.map.getBounds().getNorthEast()); 
		var _bottomLeft = _projection.fromLatLngToPoint(_this.map.getBounds().getSouthWest()); 
		var _scale = Math.pow(2,_this.map.getZoom());
		
		var _point = _projection.fromLatLngToPoint(
			new google.maps.LatLng(_this.lat,_this.lng)
		);
		
		// console.log(_point);
	   
		_this.posLeft = (_point.x - _bottomLeft.x) * _scale;
		_this.posTop = (_point.y - _topRight.y) * _scale;
		
	}
	
	PinWithLabel.prototype.print = function() {
		
		_this = this;
		
		if (!document.getElementById(_this.name)) {
			
			var _div = document.createElement("div");
			_div.id = _this.name;
			_div.className = "PinWithLabel";
			_div.style.position = "absolute";
			_div.style.width = "10px";
			_div.style.height = "10px";
			_div.style.background = "red";
			_div.style.color = "white";
			_div.style.zIndex = "10000";
			_div.style.left = _this.posLeft + "px";
			_div.style.top = _this.posTop + "px";
			
			document.body.appendChild(_div);
		} else {
			
			_div = document.getElementById(_this.name);
			
			_div.style.left = _this.posLeft + "px";
			_div.style.top = _this.posTop + "px";
		}
		
		
		
	}
	
	return PinWithLabel;
	
})();