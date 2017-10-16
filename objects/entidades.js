"use strict";


var exports = module.exports = {};

exports.entidade = class {
	constructor(Tipo, TChegada){
		this.Tipo = Tipo;
		this.TChegada = TChegada; 
	}

	getTipo(){
		return this.Tipo;
	}

	getTChegada(){
		return this.TChegada;
	}
}