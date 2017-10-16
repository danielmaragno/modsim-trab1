const config = require('./config.json');
const R 	 = require('./lib/randomGen.js');
const entidades	 = require('./objects/entidades.js');




setInterval(chegaTipo1, R.generate(config.TEC1));
// setInterval(chegaTipo2, R.generate(config.TEC2));


// Setup CHEGADAS

function chegaTipo1 () {
	let entidade = new entidades.entidade(1, new Date());
	console.log("chegou tipo 1", entidade);
	direcionaEntidade(entidade);
	
}

function chegaTipo2 () {
	let entidade = new entidades.entidade(2, new Date());
	console.log("chegou tipo 2", entidade);
	direcionaEntidade(entidade);
}

// Setup Proccess
var filaServer1 = [];
var filaServer2 = [];

// ok, busy, fail
var status1 = "ok";
var status2 = "ok";


function direcionaEntidade(entidade){
	
	if(entidade.getTipo() == 1){
		if(status1 != "fail")
			buscaRecurso(1, entidade);
		else if(status2 != "fail")
			buscaRecurso(2, entidade);
		else
			delete entidade;

	}

	else if(entidade.getTipo() == 2){
		if(status2 != "fail")
			buscaRecurso(2, entidade);
		else if(status1 != "fail")
			buscaRecurso(1, entidade);
		else
			delete entidade;
	}
}

function buscaRecurso(recurso, entidade){
	if(recurso == 1 && status1 == "busy")
		filaServer1.push(entidade);
	else if(recurso == 1 && status1 == "ok"){
		filaServer1.push(entidade);
		consomeRecurso1();
	}
	
	else if(recurso == 2 && status2 == "busy")
		filaServer2.push(entidade);
	else if(recurso == 2 && status2 == "ok"){
		filaServer2.push(entidade);
		consomeRecurso2();
	}
};

function consomeRecurso1(){
	status1 = "busy";
	let t = setInterval(
		()=>{
			let entidade = filaServer1[0];
			filaServer1.shift();
			console.log("Entidade", entidade, "utilizou recurso 1");
			if(status1 == "fail")
				clearInterval(t);
			else if(!filaServer1.length){
				status1 = "ok";
				clearInterval(t);	
			}
			
		}, 
		R.generate(config.TS1)
	)
};

function consomeRecurso2(){
	status2 = "busy";
	let t = setInterval(
		()=>{
			let entidade = filaServer2[0];
			filaServer2.shift();
			console.log("Entidade", entidade, "utilizou recurso 2");
			if(status2 == "fail")
				clearInterval(t);
			else if(!filaServer2.length){
				status2 = "ok";
				clearInterval(t);	
			}
			
		}, 
		R.generate(config.TS2)
	)
};


// Setup Falhas
setInterval(()=>{
	status1 = "fail";
	console.log("SERVER 1 FALHOU");

	let t = setInterval(()=>{
		if(filaServer1.length)
			consomeRecurso1();
		else
			status1 = "ok";

		console.log("SERVER 1 OK");
		clearInterval(t);

	} ,R.generate(config.FALHA1.em_falha))

}, R.generate(config.FALHA1.entre_falhas));


// setInterval(()=>{
// 	status2 = "fail";
// 	console.log("SERVER 2 FALHOU");

// 	let t = setInterval(()=>{
// 		if(filaServer2.length)
// 			consomeRecurso2();
// 		else
// 			status2 = "ok";

// 		console.log("SERVER 2 OK");
// 		clearInterval(t);

// 	} ,R.generate(config.FALHA2.em_falha))

// }, R.generate(config.FALHA2.entre_falhas));