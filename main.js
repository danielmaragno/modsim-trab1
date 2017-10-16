"use strict";

const config = require('./config.json');
const R 	 = require('./lib/randomGen.js');
const entidades	 = require('./objects/entidades.js');


// Setup CHEGADAS

setInterval(chegaTipo1, R.generate(config.TEC1))
// setInterval(chegaTipo2, R.generate(config.TEC2))


function chegaTipo1 () {
	console.log("chegou tipo 1");
	let entidade = new entidades.entidade(1, new Date());
	
}

function chegaTipo2 () {
	console.log("chegou tipo 2");
	let entidade = new entidades.entidade(2, new Date());
}

// Setup Proccess
var filaServer1 = [];
var filaServer2 = [];

var flagFalha1 = false;
var flagFalha2 = false;


function buscaRecurso(entidade){
	
	if(entidade.getTipo() == 1){
		if(!flagFalha1)
			buscaServer(1, entidade);
		else if(!flagFalha2)
			buscaServer(2, entidade);
		else
			delete entidade;

	}

	else if(entidade.getTipo() == 2){
		if(!flagFalha2)
			buscaServer(2, entidade);
		else if(!flagFalha1)
			buscaServer(1, entidade);
		else
			delete entidade;
	}
}

function buscaServer(servidor, entidade){

}