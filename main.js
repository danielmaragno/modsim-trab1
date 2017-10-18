
// ANGULAR SETUP
var app = angular.module('App', []);
app.controller('Controller', main);


// MAIN SETUP
function main($scope){
	var flagSimulation = true;
	$scope.flagSimulation = flagSimulation;

	var startDate = new Date();

	var TEC1 = R.generate(config.TEC1);
	var TEC2 = R.generate(config.TEC2);

	let t_chega1 = setInterval(chegaTipo1, TEC1);
	let t_chega2 = setInterval(chegaTipo2, TEC2);
	var server1 = new Server(
		"SERVER 1", 
		R.generate(config.TS1), 
		R.generate(config.FALHA1.entre_falhas), 
		R.generate(config.FALHA1.em_falha),
		startDate
	);
	var server2 = new Server(
		"SERVER 2", 
		R.generate(config.TS2), 
		R.generate(config.FALHA2.entre_falhas), 
		R.generate(config.FALHA2.em_falha),
		startDate
	);
	startFalha(server1);
	startFalha(server2);

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
	};

	// Handle end of simulation
	let t = setInterval(()=>{
		encerraSimulacao();
	}, config.SimulationTime);


	function encerraSimulacao(){
		flagSimulation = false;
		clearInterval(t_chega1);
		clearInterval(t_chega2);
		clearInterval(t);
		delete startFalha;
		console.log("FIM DA SIMULACAO!");

		numeroMedioEntidadesFilas(server1, server2);
		estatisticasDosStatus(server1, server2);
		$scope.$apply();
	}

	// Setup CHEGADAS

	function chegaTipo1 () {
		let entidade = new Entidade(1, new Date());
		console.log("chegou tipo 1", entidade);
		direcionaEntidade(entidade);
		
	}

	function chegaTipo2 () {
		let entidade = new Entidade(2, new Date());
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
				deleteEntidade(entidade)
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
		if(status == "busy")
			server.pushFila(entidade, $scope);

		else if(status == "ready"){
			// server.pushFila(entidade, $scope);
			consomeRecurso(server,entidade);
		}
	};

	function consomeRecurso(server, entidade) {
		server.setStatus("busy", $scope);

		let t = setInterval(
			()=>{
				if(flagSimulation){
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
		return entidade;
	}

	function finalizaEntidade(entidade){
		if(entidade.getTipo() == 1)
			$scope.entidades["tipo1Completou"] += 1;
		else
			$scope.entidades["tipo2Completou"] += 1;

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
			if(flagSimulation) {
				server.setStatus("fail", $scope);
				console.log(server.getName(),"FALHOU");
				handleFalha(server);
			}

		}, server.getTEntreFalhas());
	};

	function handleFalha(server){
		let t = setInterval(()=>{
			clearInterval(t);
			if(flagSimulation) {
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

}