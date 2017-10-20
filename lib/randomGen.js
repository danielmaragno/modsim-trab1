"use strict";

// Functions

var normal = function (media, desvio){
	let u1 = Math.random();
	let u2 = Math.random();
	let PI = Math.PI;

	let Z = Math.sqrt(-2*Math.log(u1)) * Math.cos(2*PI*u2);

	return Math.trunc(media + desvio*Z);
};

var uniforme = function(a, b){
	let u = Math.random();
	return Math.trunc(a + u*(b-a));
};

var exponencial = function(a){
	let u = Math.random();
	return Math.trunc( (-1/a)*Math.log(1-u) );
};

var triangular = function(a, b, c){
	let u = Math.random();
	let LIM = (b-a)/(c-a);

	let valor;	
	if(u>=0 && u<=LIM)
		valor =  a + Math.sqrt(u*(b-a)*(c-a));
	else
		valor = c - Math.sqrt((1-u)*(c-b)*(c-a));

	return Math.trunc(valor);
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
		
		case "exponencial":
			return exponencial(m.a);

		case "triangular":
			return triangular(m.a, m.b, m.c);

		default:
			return false;
	}
}