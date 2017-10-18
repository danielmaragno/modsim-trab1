

var numeroMedioEntidadesFilas = function(server1, server2){
	console.log("\n\nNúmero Médio de Entidades nas Filas\n");
	
	// guarda o último tamanho
	server1.storeFilaEsperaLengthTime(new Date(), server1.filaEspera.length)
	server2.storeFilaEsperaLengthTime(new Date(), server2.filaEspera.length);

	console.log(server1.filaEsperaLengthTime);
	console.log(server2.filaEsperaLengthTime);

	// Calcula média ponderada
	let totalTime = 0;
	let avgLength = 0;
	for(let i=0, el; el=server1.filaEsperaLengthTime[i++];){
		avgLength += (el.length*el.time);
		totalTime += el.time;
	}
	server1.totalTime = totalTime;
	server1.avgFilaEsperaLength = avgLength/totalTime;
	console.log(server1.getName(),"totalTime:",totalTime,"ms");
	console.log(server1.getName(),"avgLength:",server1.avgFilaEsperaLength);

		totalTime = 0;
		avgLength = 0;
	for(let i=0, el; el=server2.filaEsperaLengthTime[i++];){
		avgLength += (el.length*el.time);
		totalTime += el.time;
	}
	server2.totalTime = totalTime;
	server2.avgFilaEsperaLength = avgLength/totalTime;
	console.log(server2.getName(),"totalTime:",totalTime,"ms");
	console.log(server2.getName(),"avgLength:",server2.avgFilaEsperaLength);

};

var estatisticasDosStatus = function(server1, server2){
	console.log("\n\nTempo dos Status\n");
	let endDate = new Date();

	// Calcula o último tempo
	if(server1.status == 'fail')
		server1.countFails(endDate);
	else if(server1.status == 'busy')
		server1.countBusy(endDate);

	if(server2.status == 'fail')
		server2.countFails(endDate);
	else if(server2.status == 'busy')
		server2.countBusy(endDate);

	server1.percentFail = (server1.tempoTotalFalhas / server1.totalTime) * 100;
	server2.percentFail = (server2.tempoTotalFalhas / server2.totalTime) * 100;

	server1.percentBusy = (server1.tempoTotalOcupado / (server1.totalTime - server1.tempoTotalFalhas)) * 100;
	server2.percentBusy = (server2.tempoTotalOcupado / (server2.totalTime - server2.tempoTotalFalhas)) * 100;

	console.log("server1");
	console.log("Falhas:",server1.falhas);
	console.log("Tempo total das falhas:",server1.tempoTotalFalhas);
	console.log("Porcentagem de falha:", server1.percentFail);
	console.log("Tempo total Ocupado:",server1.tempoTotalOcupado);
	console.log("Porcentagem ocupado:", server1.percentBusy);

	console.log("server2");
	console.log("Falhas:",server2.falhas);
	console.log("Tempo total das falhas:",server2.tempoTotalFalhas);
	console.log("Porcentagem de falha:", server2.percentFail);
	console.log("Tempo total Ocupado:",server2.tempoTotalOcupado);
	console.log("Porcentagem ocupado:", server2.percentBusy);

}