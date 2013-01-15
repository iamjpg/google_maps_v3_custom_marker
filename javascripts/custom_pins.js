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
			
			var _projection = _this.map.getProjection();
			
			/*
			var _point = _projection.fromLatLngToPoint(
				new google.maps.LatLng(_this.lat,_this.lng)
			);
			
			console.log(_point);
		   
			_this.posLeft = _point.x;
			_this.posTop = _point.y;
			*/
			
			_this.print();
		
		});
	}
	
	PinWithLabel.prototype.print = function() {
		
		_this = this;
		
		if (!document.getElementById(_this.name)) {
			
			console.log(_this.posTop);
			
			var _div = document.createElement("div");
			_div.id = _this.name;
			_div.style.position = "absolute";
			_div.style.width = "10px";
			_div.style.height = "10px";
			_div.style.background = "red";
			_div.style.color = "white";
			_div.style.zIndex = "10000";
			_div.style.left = _this.posLeft + "px";
			_div.style.top = _this.posTop + "px";
			
			document.body.appendChild(_div);
		}
		
		
		
	}
	
	return PinWithLabel;
	
})();