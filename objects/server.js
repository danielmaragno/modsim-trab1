"use strict";



class Server {

	constructor(name, TS, TEntreFalhas, TFalha){
		this.name = name;
		this.TS = TS;
		this.TEntreFalhas = TEntreFalhas;
		this.TFalha = TFalha;

		this.status = "ready";
		this.filaEspera = [];
	}

	getName(){
		return this.name;
	}

	getTS(){
		return this.TS;
	}

	getTEntreFalhas(){
		return this.TEntreFalhas;
	}

	getTFalha(){
		return this.TFalha;
	}

	getStatus(){
		return this.status;
	}

	setStatus(status){
		this.status = status;
	}

	getFilaEspera(){
		return this.filaEspera;
	}

	pushFila(entidade){
		this.filaEspera.push(entidade);
	}

	shiftFila(entidade){
		this.filaEspera.shift();
	}
}