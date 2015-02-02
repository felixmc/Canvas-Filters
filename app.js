var cavas = document.getElementById("canvas");
var c     = canvas.getContext("2d");


function inverse(p) {
	p.r = 255 - p.r;
	p.g = 255 - p.g;
	p.b = 255 - p.b;
}

function bw(p) {
	var avg = (p.r + p.g + p.b) / 3;
	p.r = avg;
	p.g = avg;
	p.b = avg;
}

function sw(p) {
	var red = p.r;
	p.r = p.b;
	p.b = red;
}

function sw3(p) {
	var red = p.r;
	var blu = p.b;
	var gre = p.g;
	p.r = gre;
	p.b = red;
	p.g = blu;
}

function csw(p) {
	if (p.x % 8 > 3) {
		return sw(p);
	} else {
		return sw3(p);
	}
}

function min(p) {
	var avg = Math.min(Math.min(p.r, p.b), p.g);
	p.r = avg;
	p.g = avg;
	p.b = avg;
}

function max(p) {
	var avg = Math.max(Math.max(p.r, p.b), p.g);
	p.r = avg;
	p.g = avg;
	p.b = avg;
}

function red(p) {
	p.g = 0;
	p.b = 0;
}

function green(p) {
	p.r = 0;
	p.b = 0;
}

function blue(p) {
	p.g = 0;
	p.r = 0;
}

function boost(p) {
	var avg = (p.r + p.g + p.b) / 3;
	//if (avg > 127) {
		p.r += p.r * .20;
		p.g += p.g * .20;
		p.b += p.b * .20;
	///}

	return p;
}

function multi(p) {
	var avg = (p.r * p.g * p.b) / (256 * 256);
	p.r = avg;
	p.g = avg;
	p.b = avg;
}

function multi2(p) {
	p.r = (p.g * p.b) / 255;
	p.g = (p.r * p.b) / 255;
	p.b = (p.r * p.g) / 255;
}

var filters = [inverse, bw, sw, sw3, csw, min, max, red, green, blue, boost, multi, multi2];

function imageLoaded(ev) {
    var img = ev.target;
    var width = cavas.width / 2;
    var height = cavas.height;

    c.drawImage(img, 0, 0);
		var fi = 0;

		function nextFilter() {
			var imageData = c.getImageData(0, 0, width, height);
			var px = pixels(imageData, width, height);
			var filter = filters[fi++ % filters.length];
			px.filter(filter, function() {
				c.putImageData(imageData, width, 0);
				setTimeout(nextFilter, 1000);
			});
		};

		nextFilter();
}

var img = new Image();
img.onload = imageLoaded;
img.src = "acid.jpg";

