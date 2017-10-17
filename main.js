
// ANGULAR SETUP
var app = angular.module('App', []);
app.controller('Controller', main);


// MAIN SETUP
function main($scope){
	var flagSimulation = true;

	var TEC1 = R.generate(config.TEC1);
	var TEC2 = R.generate(config.TEC2);

	let t_chega1 = setInterval(chegaTipo1, TEC1);
	let t_chega2 = setInterval(chegaTipo2, TEC2);
	var server1 = new Server(
		"SERVER 1", 
		R.generate(config.TS1), 
		R.generate(config.FALHA1.entre_falhas), 
		R.generate(config.FALHA1.em_falha)
	);
	var server2 = new Server(
		"SERVER 2", 
		R.generate(config.TS2), 
		R.generate(config.FALHA2.entre_falhas), 
		R.generate(config.FALHA2.em_falha)
	);
	startFalha(server1);
	startFalha(server2);

	let t = setInterval(()=>{
		flagSimulation = false;
		clearInterval(t_chega1);
		clearInterval(t_chega2);
		clearInterval(t);
		delete startFalha;
		console.log("FIM DA SIMULACAO!");
	}, config.SimulationTime);




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
			if(server1.getStatus() != "fail")
				buscaRecurso(server1, entidade);
			
			else if(server2.getStatus() != "fail")
				buscaRecurso(server2, entidade);
			
			else{
				console.log("DELETE", entidade);
				delete entidade;
			}

		}

		else if(entidade.getTipo() == 2){
			if(server2.getStatus() != "fail")
				buscaRecurso(server2, entidade);
			
			else if(server1.getStatus() != "fail")
				buscaRecurso(server1, entidade);
			
			else{
				console.log("DELETE", entidade);
				delete entidade;
			}
		}
	}

	function buscaRecurso(server, entidade){
		let status = server.getStatus();
		if(status == "busy")
			server.pushFila(entidade);

		else if(status == "ready"){
			server.pushFila(entidade);
			consomeRecurso(server);
		}
	};

	function consomeRecurso(server) {
		server.setStatus("busy");

		let t = setInterval(
			()=>{
				let entidade = server.getFilaEspera()[0];
				server.shiftFila();
				console.log("Entidade", entidade, "utilizou", server.getName());

				if(server.getStatus() == "fail")
					clearInterval(t);
				else if(!server.getFilaEspera().length){
					server.setStatus("ready");
					clearInterval(t);
				}
			}, 
			server.getTS()
		);
	}

	// Setup FALHAS

	function startFalha(server){
		let t = setInterval(()=>{
			server.setStatus("fail");
			console.log(server.getName(),"FALHOU");
			clearInterval(t);
			if(flagSimulation) handleFalha(server);

		}, server.getTEntreFalhas());
	};

	function handleFalha(server){
		let t = setInterval(()=>{
			if(server.getFilaEspera().length)
				consomeRecurso(server);
			else
				server.setStatus("ready");

			console.log(server.getName(),"OK");
			clearInterval(t);
			if(flagSimulation) startFalha(server);

		}, server.getTFalha());
	};


	// $scope SETUP
	$scope.TEC1 = TEC1;
	$scope.TEC2 = TEC2;

	$scope.server1 = server1;
	$scope.server2 = server2;
	$scope.SimulationTime = config.SimulationTime;

}