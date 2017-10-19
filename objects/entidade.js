"use strict";



class Entidade {

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

	getEntroNaFila(){
		return this.TEntrouFila;
	}

	setEntroNaFila(currentTime){
		this.TEntrouFila = currentTime;
	}

}