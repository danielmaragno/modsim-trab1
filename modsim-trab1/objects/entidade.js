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

	getTEntrouNaFila(){
		return this.TEntrouFila;
	}

	setTEntrouNaFila(currentTime){
		this.TEntrouFila = currentTime;
	}

}