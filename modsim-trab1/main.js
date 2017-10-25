
// ANGULAR SETUP
var app = angular.module('App', []);
app.controller('Controller', main);


// MAIN SETUP
function main($scope){
	$scope.handleStartEndButtonClick = function(){
		if($scope.flagSimulation == "preSimulation"){
			$scope.flagSimulation = true;
			startSimulation();
		}
		else if($scope.flagSimulation){
			encerraSimulacao();
		}
		else
			window.location.reload();
	};

	$scope.flagSimulation = "preSimulation";

	var TEC1 = R.generate(config.TEC1);
	var TEC2 = R.generate(config.TEC2);

	let t_chega1, t_chega2;
	let server1, server2;
	var eventos = [];


	function startSimulation(){
		var startDate = new Date();
		let evento;
		
		t_chega1 = setInterval(chegaTipo1, TEC1);
		t_chega2 = setInterval(chegaTipo2, TEC2);
		server1 = new Server(
			"SERVER 1", 
			R.generate(config.TS1), 
			R.generate(config.FALHA1.entre_falhas), 
			R.generate(config.FALHA1.em_falha),
			startDate,
			config.SERVER1MaxFila
		);
		server2 = new Server(
			"SERVER 2", 
			R.generate(config.TS2), 
			R.generate(config.FALHA2.entre_falhas), 
			R.generate(config.FALHA2.em_falha),
			startDate,
			config.SERVER2MaxFila
		);

		// $scope SETUP
		$scope.TEC1 = TEC1;
		$scope.TEC2 = TEC2;

		$scope.server1 = server1;
		$scope.server2 = server2;
		$scope.SimulationTime = config.SimulationTime;

		$scope.entidades = {
			"tipo1Chegada": 0,
			"tipo1Completou": 0,
			"tipo1Deletado": 0,
			"tipo1TrocaServer": 0,
			
			"tipo2Chegada": 0,
			"tipo2Completou": 0,
			"tipo2Deletado": 0,
			"tipo2TrocaServer": 0,

			"tipo1TemposSistema": [],
			"tipo2TemposSistema": [],

			"tipo1TemposFila": [],
			"tipo2TemposFila": [],
		};
		var tempo = 0;
		eventos.push(new Evento('chegada1', 0));
		eventos.push(new Evento('chegada2', 0));
		eventos.push(new Evento('falha', 0, null, server1));
		eventos.push(new Evento('falha', 0, null, server2));
		eventos.push(new Evento('fim', config.SimulationTime));

		while(eventos.length > 0) {
			evento = eventos.shift();
			tempo = evento.getTempo();
			switch(evento.getTipo) {
				case 'chegada1':
					chegaTipo1();
					break;
				
				case 'chegada2':
					chegaTipo2();
					break;
				
				case 'falha':
					startFalha(evento.getServidor());
					break;
				
				case 'repara':
					handleFalha(evento.getServidor());
					break;
				
				case 'buscaRecurso':
					direcionaEntidade(evento.getEntidade());
					break;
				
				case 'consome':
					consomeRecurso(evento.getServidor(), evento.getEntidade());
					break;
				
				case 'fimEntidade':
					finalizaEntidade(evento.getEntidade())
					break;
				
				case 'fim':
					encerraSimulacao()
					break;

			}
		}

		// Handle end of simulation
		/*let t = setInterval(()=>{
			encerraSimulacao(t);
		}, config.SimulationTime);*/
	};

	

	


	function encerraSimulacao(t){
		$scope.flagSimulation = false;
		clearInterval(t_chega1);
		clearInterval(t_chega2);
		clearInterval(t);
		delete startFalha;
		console.log("FIM DA SIMULACAO!");

		numeroMedioEntidadesFilas(server1, server2);
		estatisticasDosStatus(server1, server2);
		estatisticaTemposEntidades(server1, server2, $scope.entidades, $scope)
		$scope.$apply();
	}

	function encerraSimulacao(){
		$scope.flagSimulation = false;
		clearInterval(t_chega1);
		clearInterval(t_chega2);
		delete startFalha;
		console.log("FIM DA SIMULACAO!");

		numeroMedioEntidadesFilas(server1, server2);
		estatisticasDosStatus(server1, server2);
		estatisticaTemposEntidades(server1, server2, $scope.entidades, $scope)
		$scope.$apply();
	}

	// Setup CHEGADAS

	function chegaTipo1 () {
		let entidade = new Entidade(1, tempo);
		console.log("chegou tipo 1", entidade);
		direcionaEntidade(entidade);
		
	}

	function chegaTipo2 () {
		let entidade = new Entidade(2, tempo);
		console.log("chegou tipo 2", entidade);
		direcionaEntidade(entidade);
	}

	// Setup PROCESSAMENTO


	function direcionaEntidade(entidade){
		
		if(entidade.getTipo() == 1){
			$scope.entidades["tipo1Chegada"] += 1;

			if(server1.getStatus() != "fail")
				buscaRecurso(server1, entidade);
			
			else if(server2.getStatus() != "fail"){
				$scope.entidades.tipo1TrocaServer += 1;
				buscaRecurso(server2, entidade);
			}
			
			else{
				console.log("DELETE", entidade);
				deleteEntidade(entidade);
			}

		}

		else if(entidade.getTipo() == 2){
			$scope.entidades["tipo2Chegada"] += 1;

			if(server2.getStatus() != "fail")
				buscaRecurso(server2, entidade);
			
			else if(server1.getStatus() != "fail"){
				$scope.entidades.tipo2TrocaServer += 1;
				buscaRecurso(server1, entidade);
			}
			
			else{
				console.log("DELETE", entidade);
				deleteEntidade(entidade)
			}
		}

		$scope.$apply();
	}

	function buscaRecurso(server, entidade){
		let status = server.getStatus();
		if(status == "busy"){
			// Se a fila estiver cheia deleta
			if(!server.pushFila(entidade, $scope))
				deleteEntidade(entidade);
		}

		else if(status == "ready"){
			// server.pushFila(entidade, $scope);
			consomeRecurso(server,entidade);
		}
	};

	function consomeRecurso(server, entidade) {
		server.setStatus("busy", $scope);

		let t = setInterval(
			()=>{
				if($scope.flagSimulation){
					console.log("Entidade", entidade, "utilizou", server.getName());
					finalizaEntidade(entidade);

					if(server.getStatus() == "fail")
						clearInterval(t);
					else if(!server.getFilaEspera().length){
						server.setStatus("ready", $scope);
						clearInterval(t);
					}
					else{
						entidade = getEntidadeFila(server);
					}
				}
			}, 
			server.getTS()
		);
	}

	function getEntidadeFila(server){
		let entidade = server.getFilaEspera()[0];
		server.shiftFila($scope);

		// calcula tempo que ficou na fila
		if(entidade.getTipo() == 1){
			$scope.entidades["tipo1TemposFila"].push(new Date() - entidade.getTEntrouNaFila());
		}
		else{
			$scope.entidades["tipo2TemposFila"].push(new Date() - entidade.getTEntrouNaFila());
		}


		return entidade;
	}

	function finalizaEntidade(entidade){
		if(entidade.getTipo() == 1){
			$scope.entidades["tipo1Completou"] += 1;
			$scope.entidades["tipo1TemposSistema"].push(new Date() - entidade.getTChegada());
		}
		else{
			$scope.entidades["tipo2Completou"] += 1;
			$scope.entidades["tipo2TemposSistema"].push(new Date() - entidade.getTChegada());
		}

		$scope.$apply();

	}

	function deleteEntidade(entidade){
		delete entidade;
		
		if(entidade.getTipo() == 1)
			$scope.entidades["tipo1Deletado"] += 1;
		else
			$scope.entidades["tipo2Deletado"] += 1;

		$scope.$apply();
	}


	// Setup FALHAS

	function startFalha(server){
		let t = setInterval(()=>{
			clearInterval(t);
			if($scope.flagSimulation) {
				server.setStatus("fail", $scope);
				console.log(server.getName(),"FALHOU");
				handleFalha(server);
			}

		}, server.getTEntreFalhas());
	};

	function handleFalha(server){
		let t = setInterval(()=>{
			clearInterval(t);
			if($scope.flagSimulation) {
				if(server.getFilaEspera().length){
					let entidade = getEntidadeFila(server);
					consomeRecurso(server, entidade);
				}
				else
					server.setStatus("ready", $scope);

				console.log(server.getName(),"OK");
				startFalha(server);
			}



		}, server.getTFalha());
	};

	function insereEvento(evento) {
		let inserido = false;
		for(let i = 0; i < eventos.length - 1; i++) {
			if (eventos[i].getTempo() > evento.getTempo()){
				eventos.splice(i, 0, evento);
				inserido = true;
			}
		}
		if(!inserido){
			eventos.push(evento);
		}
	}

	function comparaTempo(a, b) {
		if (a.getTempo().getTime() > b.getTempo().getTime()) {
			return 1;
		}
		else {
			if (b.getTempo().getTime() > a.getTempo().getTime()) {
				return -1;
			}
			else
				return 0;
		}
	};

}