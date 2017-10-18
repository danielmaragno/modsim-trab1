

var numeroMedioEntidadesFilas = function(server1, server2){
	console.log("\n\nNýmero Médio de Entidades nas Filas\n");
	
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
	server1.avgFilaEsperaLength = avgLength/totalTime;
	console.log(server1.getName(),"totalTime:",totalTime,"ms");
	console.log(server1.getName(),"avgLength:",server1.avgFilaEsperaLength);

		totalTime = 0;
		avgLength = 0;
	for(let i=0, el; el=server2.filaEsperaLengthTime[i++];){
		avgLength += (el.length*el.time);
		totalTime += el.time;
	}
	server2.avgFilaEsperaLength = avgLength/totalTime;
	console.log(server2.getName(),"totalTime:",totalTime,"ms");
	console.log(server2.getName(),"avgLength:",server2.avgFilaEsperaLength);

};