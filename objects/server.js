"use strict";



class Server {

	constructor(name, TS, TEntreFalhas, TFalha, startDate){
		this.name = name;
		this.TS = TS;
		this.TEntreFalhas = TEntreFalhas;
		this.TFalha = TFalha;

		this.status = "ready";
		this.filaEspera = [];

		// statistics
		this.lastDate = startDate;
		this.filaEsperaLengthTime = [];
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

	setStatus(status,$scope){
		this.status = status;
		$scope.$apply();
	}

	getFilaEspera(){
		return this.filaEspera;
	}

	pushFila(entidade, $scope){
		this.storeFilaEsperaLengthTime(new Date(), this.filaEspera.length);
		this.filaEspera.push(entidade);
		
		$scope.$apply();
	}

	shiftFila($scope){
		this.storeFilaEsperaLengthTime(new Date(), this.filaEspera.length);
		this.filaEspera.shift();

		$scope.$apply();
	}

	// collect statistics
	storeFilaEsperaLengthTime(currentDate, length){
		this.filaEsperaLengthTime.push({
			'time': currentDate - this.lastDate,
			'length': length
		});
		this.lastDate = currentDate;
	}
}