"use strict";



class Server {

	constructor(name, TS, TEntreFalhas, TFalha, startDate, filaEsperaMaxlength){
		this.name = name;
		this.TS = TS;
		this.TEntreFalhas = TEntreFalhas;
		this.TFalha = TFalha;

		this.status = "ready";
		this.filaEspera = [];
		this.filaEsperaMaxlength = filaEsperaMaxlength;

		// statistics
		this.lastDate = startDate;
		this.filaEsperaLengthTime = [];

		this.statusLastChange = startDate;
		
		this.falhas = 0;
		this.tempoTotalFalhas = 0;

		this.tempoTotalOcupado = 0;
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
		if(this.status == "fail")
			this.countFails(new Date());
		else if(this.status == "busy")
			this.countBusy(new Date());
		else
			this.statusLastChange = new Date();


		this.status = status;
		$scope.$apply();
	}

	getFilaEspera(){
		return this.filaEspera;
	}

	pushFila(entidade, $scope){
		if(this.filaEsperaMaxlength < 0 || this.filaEspera.length < this.filaEsperaMaxlength){
			this.storeFilaEsperaLengthTime(new Date(), this.filaEspera.length);
			this.filaEspera.push(entidade);
			$scope.$apply();

			return true;
		}
		else
			return false;
		
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

	countFails(currentDate){
		this.falhas += 1;
		this.tempoTotalFalhas += (currentDate - this.statusLastChange);
		this.statusLastChange = currentDate;
	}

	countBusy(currentDate){
		this.tempoTotalOcupado += (currentDate - this.statusLastChange);
		this.statusLastChange = currentDate
	}
}