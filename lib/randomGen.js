"use strict";

// Functions

var normal = function (media, desvio){
	let u1 = Math.random();
	let u2 = Math.random();
	let PI = Math.PI;

	let Z = Math.sqrt(-2*Math.log(u1)) * Math.cos(2*PI*u2);

	return media + desvio*Z;
};

var uniforme = function(a, b){
	let u = Math.random();
	return a + u*(b-a);
};

var expornencial = function(a){
	let u = Math.random();
	return (-1/a)*Math.log(1-u);
};

var triangular = function(a, b, c){
	let u = Math.random();
	let LIM = (b-a)/(c-a);

	if(u>=0 && u<=LIM)
		return a + Math.sqrt(u*(b-a)*(c-a));
	else
		return c - Math.sqrt((1-u)*(c-b)*(c-a));
};

// Exports
var R= {};

R.generate = function(m){
	switch(m.metodo){
		case "constante":
			return m.valor;
			
		case "normal":
			return normal(m.media, m.desvio);
		
		case "uniforme":
			return uniforme(m.a, m.b);
		
		case "expornencial":
			return expornencial(m.a);

		case "triangular":
			return triangular(m.a, m.b, m.c);

		default:
			return false;
	}
}