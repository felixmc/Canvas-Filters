var props = ['r', 'b', 'g', 'a'];

function pixels(image, width, height) {  
	var p = {};

	function defProp(prop, i) {
		Object.defineProperty(p, prop, {
			get: function() {
				return image.data[p.pos + i];
      },
      set: function(val) {
				image.data[p.pos + i] = val;
      },
			writeable: true
		});
	}

	for (var i in props) {
		defProp(props[i], Number(i));
	}

	p.filter = function(filter, cb) {
		for (var y = 0; y < width; y++) {
			for (var x = 0; x < width; x++) {
				p.get(x, y);	
				filter(p);
			}
		}
		cb();
	};

	p.get = function(x, y) {
    p.pos = ((y * width) + x) * 4;
		p.x = x;
		p.y = y;
    return p;
  };

	return p;
}




