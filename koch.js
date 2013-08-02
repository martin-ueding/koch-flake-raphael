// Copyright © 2011, 2013 Martin Ueding <dev@martin-ueding.de>
// Licensed under The MIT License

var w =window.innerHeight / (Math.sin(Math.PI/3) + 0.5*Math.tan(Math.PI/6));
var w_shift = (window.innerWidth-w)/2;
var paper = Raphael(w_shift, 0, w, window.innerHeight);

function myline(a, b, c, d) {
	return paper.path("M " + a + " " + b + " l " + c + " " + d);
}

var length = w;
var max_level = 1;

function getLength(level) {
	return length*Math.pow(1/3, max_level-level);
}

function koch(level, a, b, theta) {
	if (level <= 1) {
		myline(a, b, Math.cos(theta)*getLength(level), Math.sin(theta)*getLength(level));
		return;
	}

	// _/\_
	// ABCD

	level--;

	koch(level,
	     a,
	     b,
	     theta
	    );

	koch(level,
	     a + Math.cos(theta)*getLength(level),
	     b + Math.sin(theta)*getLength(level),
	     theta + Math.PI / 3
	    );

	koch(level,
	     a + Math.cos(theta)*getLength(level) + Math.cos(theta + Math.PI / 3)*getLength(level),
	     b + Math.sin(theta)*getLength(level) + Math.sin(theta + Math.PI / 3)*getLength(level),
	     theta  - Math.PI / 3
	    );

	koch(level,
	     a + Math.cos(theta)*getLength(level) * 2,
	     b + Math.sin(theta)*getLength(level) * 2,
	     theta
	    );
}



function steps() {
	paper.clear();
	koch(max_level, 0, length*Math.sin(Math.PI/3), 0);
	koch(max_level, length-0, length*Math.sin(Math.PI/3), 4*Math.PI/3);
	koch(max_level, length/2, 0, 8*Math.PI/3);
	paper.text(length/2, length/2, max_level);
	max_level++;
	if (max_level < 7)
		setTimeout(steps, 1000);
}

steps();
